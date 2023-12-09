<script>
// @ts-nocheck

	import { onMount } from "svelte";
    import TopSearches from "../components/explorepageComponents/TopSearches.svelte";
    import { topSearchesStore } from "../store";

    let results = [];

    const fetchData = async () => {
        try {
            let url = "https://saavn.me/modules?language=hindi,english";
            let homeData = await fetch(url);
            let parsedData = await homeData.json();
            topSearchesStore.set(parsedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    onMount(() => {
        fetchData();
        topSearchesStore.subscribe(value => {
            console.log("Subscribed value: ", value);
            results = value;
        });
    });
</script>

<section id="explorePage">
    <div id="exploreSearchBar">
        <input placeholder="Search for a song, album or artist" id="exploreSearchBox" type="text"/>
        <span id="clearBox" class="material-symbols-outlined">close</span>
    </div>
    <div id="explorePageContents">
        <div id="results">
                    <div id="topSearchesContainer">
                        <div id="topSearchesText">
                        Top Searches
                        <img id="topSearchesIcon" src="https://c.tenor.com/S8dOItPNscgAAAAi/loop-loading.gif" alt="" /></div>
                        
                        <a href="/explore/topresults" id="mostRecentSearch">
                            <span id="mostRecentSearchIcon" class="material-symbols-outlined">
                                history
                            </span>
                            <div>
                                Most Recent Search
                            </div>
                        </a>
                        {#each results.data.trending.albums as element}
                                <TopSearches
                                    title={element.name}
                                />
                        {/each}
                    </div>
                }>
        </div>
        </div>
    }
    </section>