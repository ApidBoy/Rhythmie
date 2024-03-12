<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { searchStore, searchResultStore, limitString, fetchSong, playerData } from '../../store';
	import defaultImg from '$lib/res/default.png';
	import play from '$lib/res/play.png';
	import dots from '$lib/res/dots.png';
	import unfav from '$lib/res/unfav.png';
	import youtube from '$lib/res/youtube.png';
	import artist from '$lib/res/artist.png';
	import add from '$lib/res/add.png';
	import now from '$lib/res/now.gif';
	import moreWhite from '$lib/res/arrow-right-white.png';
	let searchText = '';
	let searchResults = {};
	let playerDataVariable;

	searchStore.subscribe((value) => {
		searchText = value;
	});
	searchResultStore.subscribe((value) => {
		searchResults = value;
	});
	playerData.subscribe((value) => {
		playerDataVariable = value;
	});

	function debounce(func, delay) {
		let timeoutId;
		return function (...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}

	const debouncedSearch = debounce(() => {
    	goto('/explore/topresults');
		searchStore.set(searchText);
		handleSearch();
		if(searchText === '')
    		goto('/explore');
  	}, 1500);

	const handleInput = (event) => {
    	searchText = event.target.value;
		debouncedSearch();
	}

	const handleSearch = async () => {
		await fetch(`https://saavn.dev/api/search/all?query=${searchText}`)
		.then((response) => response.json())
		.then((data) => {
			console.log("Data -", data);
			searchResultStore.set(data.data);
		});
	}

	console.log('Search results - ', searchResults);
</script>

<div id="contentsContainer">
	{#if searchResults.songs.results.length === 0}
	<div>LOL</div>
	{:else}
	<section id="contents">
		<section id="row">
			<div id="categoryContainer">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={() => goto('/explore')} id="searchBack" class="material-symbols-outlined"> arrow_back_ios </span>
				<div id="activeCategory" class="searchCategory">
					<button on:click={() => goto('/explore/topresults')}>Top Results</button>
				</div>
				<div class="searchCategory">
					<button on:click={() => goto('/explore/songs')}>Songs</button>
				</div>
				<div class="searchCategory">
					<button on:click={() => goto('/explore/albums')}>Albums</button>
				</div>
				<div class="searchCategory">
					<button on:click={() => goto('/explore/artists')}>Artists</button>
				</div>
			</div>

			<div id="insideRow">
				<!-- {#if searchResults.topQuery.results.length !== 0} -->
				<div class="categoryTitle">Top Result for "{searchText}"</div>
				<section class="searchResultsContainer" id="topMostResult">
                    <div id="topMostExtended">
                        <div class="topMostResult">
							<div id="songArtContainer">
								<object
									id="topMostResultMusicArt"
									data={searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].image[1].link : searchResults.songs.results[0].image[1].link}
									type="image/png"
									aria-label="Song Art"
								>
									<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
								</object>
								{#if playerDataVariable.length !== 0 && (searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].id : searchResults.songs.results[0].id === playerDataVariable.data[0].id)}
								<div id="nowPlayingContainer">
									<img draggable={false} id="nowPlaying" src={now} alt="" />
								</div>
								{/if}
							</div>
                            <div id="topMostResultSongInfo">
                                <div id="topMostActualInfo">
                                    <div id="topMostResultSongTitle">
                                        {searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].title : searchResults.songs.results[0].title}
                                    </div>
                                    <div id="topMostResultSongArtist">
										{#if searchResults.topQuery.results.length !== 0}
											{#if searchResults.topQuery.results[0].type === "artist"}
												{searchResults.topQuery.results[0].description}
											{:else}
												{searchResults.topQuery.results[0].primaryArtists}
											{/if}
										{:else}
											{searchResults.songs.results[0].primaryArtists}
										{/if}
                                    </div>
                                </div>
                                <div class="topMostResultIcons" id="topMostResultIcons">
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                    <img on:click={() => fetchSong(searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].id : searchResults.songs.results[0].id)} draggable={false} id="topMostResultPlayButton" src={play} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="extendedIcons">
                            <img draggable={false} id="topMostResultFavButton" class="searchedIcons" src={unfav} alt="" />
                            <button on:click={() => location.href = `https://youtube.com/results?search_query=${searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].title : searchResults.songs.results[0].title} by ${searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].primaryArtists : searchResults.songs.results[0].primaryArtists}`}>
                                <img class="extendedButtonIcons" id="youtubeIcon" alt="YouTube logo" src={youtube} />
                                Search YouTube
                            </button>
                            <button on:click={() => location.href = `https://genius.com/search?q=${searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].primaryArtists : searchResults.songs.results[0].primaryArtists}`}>
                                <img class="extendedButtonIcons" alt="Artist logo" src={artist} />
                                Go to artist
                            </button>
                            <button>
                                <img class="extendedButtonIcons" alt="Queue logo" src={add}/>
                                Add to queue
                            </button>
                            <img draggable={false} id="topMostResultOptionButton" class="searchedIcons" src={dots} alt="" />
                        </div>
                    </div>
				</section>
				<!-- {/if} -->

				<div id="albumsCategory" class="categoryTitle">Albums</div>
				<section class="searchResultsContainer" id="topResultsAlbums">
					{#each searchResults.albums.results as element}
						<div class="searchAlbumResults">
							{#if element.image[1].link}
								<div id="albumArtContainer">
									<object
										id="searchedAlbumArt"
										data={element.image[1].link}
										type="image/png"
										aria-label="Album Art"
									>
										<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
									</object>
									<img draggable={false} id="searchedAlbumPlayButton" src={play} alt="" />
								</div>
							{:else}
								<img alt="Album art" src={defaultImg} class="searchAlbumResults" />
							{/if}
                                <div id="searchedAlbumInfo">
                                    <div id="searchedAlbumTitle">{limitString(element.title, 18)}</div>
                                    <div id="searchedAlbumArtist">{limitString(element.artist, 14)}</div>
                                </div>
						</div>
					{/each}
                    <div id="moreButton">
                        <a href="/explore/albums"><img alt="More" src={moreWhite} /></a>
                    </div>
				</section>
            </div>

		</section>

		<section id="row">
			<div id="insideRow">

				<div class="categoryTitle">Songs</div>
				<section class="searchResultsContainer">
					{#each searchResults.songs.results as element}
						<div class="searchResults">
							{#if element.image[0].link}
								<div id="musicArtContainer">
									<!-- svelte-ignore a11y-click-events-have-key-events -->
									<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
									<!-- svelte-ignore a11y-no-static-element-interactions -->
									<object
										id="searchedMusicArt"
										data={element.image[0].link}
										type="image/png"
										aria-label="Song Art"
										on:click={() => fetchSong(element.id)}
									>
										<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt={''} />
									</object>
									<img draggable={false} id="searchedPlayButton" src={play} alt="" />
								</div>
							{:else}
								<img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
							{/if}
							<div id="searchedSongInfo">
								<div id="actualInfo">
									<div id="searchedSongTitle">{element.title}</div>
									<div id="searchedSongArtist">{element.primaryArtists}</div>
								</div>
								<div class="topSearchIcons" id="searchedIcons">
									<img
										draggable={false}
										id="searchedFavButton"
										class="searchedIcons"
										src={unfav}
										alt=""
									/>
									<img
										draggable={false}
										id="searchedOptionButton"
										class="searchedIcons"
										src={dots}
										alt=""
									/>
								</div>
							</div>
						</div>
					{/each}
				</section>

				<div id="artistsCategory" class="categoryTitle">Artists</div>
				<section class="searchResultsContainer" id="artistsContainer">
					{#each searchResults.artists.results as element}
						<div class="searchAlbumResults">
							{#if element.image[1].link}
								<div id="artistArtContainer">
									<object
										id="searchedArtistArt"
										data={element.image[1].link}
										type="image/png"
										aria-label="Album Art"
									>
										<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
									</object>
									<img draggable={false} id="searchedAlbumPlayButton" src={play} alt="" />
								</div>
							{:else}
								<img alt="Album art" src={defaultImg} class="searchAlbumResults" />
							{/if}
                                <div id="searchedAlbumInfo">
                                    <div id="searchedAlbumTitle">{limitString(element.title, 18)}</div>
                                    <div id="searchedAlbumArtist">{limitString(element.description, 14)}</div>
                                </div>
						</div>
					{/each}
                    <div id="moreButton">
                        <a href="/explore/albums"><img alt="More" src={moreWhite} /></a>
                    </div>
				</section>

			</div>
		</section>
	</section>









	
	<section id="mobileContents">


		
				
		<div id="searchBar">
			<input bind:value={searchText} on:input={handleInput} maxlength="46" placeholder="Search for a song, artist or album" id="searchBox" type="text" />
			<span id="clearBox" class="material-symbols-outlined">close</span>
		</div>


		
			<div id="categoryContainer">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={() => goto('/explore')} id="searchBack" class="material-symbols-outlined"> arrow_back_ios </span>
				<div id="activeCategory" class="searchCategory">
					<button on:click={() => goto('/explore/topresults')}>Top Results</button>
				</div>
				<div class="searchCategory">
					<button on:click={() => goto('/explore/songs')}>Songs</button>
				</div>
				<div class="searchCategory">
					<button on:click={() => goto('/explore/albums')}>Albums</button>
				</div>
				<div class="searchCategory">
					<button on:click={() => goto('/explore/artists')}>Artists</button>
				</div>
			</div>


			<!-- {#if searchResults.topQuery.results.length !== 0} -->
				<div class="categoryTitle">Top Result for "{limitString(searchText, 30)}"</div>
				<section class="searchResultsContainer" id="topMostResult">
                    <div id="topMostExtended">
                        <div class="topMostResult">
							<div id="songArtContainer">
								<object
									id="topMostResultMusicArt"
									data={searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].image[1].link : searchResults.songs.results[0].image[1].link}
									type="image/png"
									aria-label="Song Art"
								>
									<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
								</object>
								{#if playerDataVariable.length !== 0 && (searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].id : searchResults.songs.results[0].id === playerDataVariable.data[0].id)}
								<div id="nowPlayingContainer">
									<img draggable={false} id="nowPlaying" src={now} alt="" />
								</div>
								{/if}
							</div>
                            <div id="topMostResultSongInfo">
                                <div id="topMostActualInfo">
                                    <div id="topMostResultSongTitle">
                                        {searchResults.topQuery.results.length !== 0 ? limitString(searchResults.topQuery.results[0].title, 19) : limitString(searchResults.songs.results[0].title, 19)}
                                    </div>
                                    <div id="topMostResultSongArtist">
										{#if searchResults.topQuery.results.length !== 0}
											{#if searchResults.topQuery.results[0].type === "artist"}
												{searchResults.topQuery.results[0].description}
											{:else}
												{limitString(searchResults.topQuery.results[0].primaryArtists, 32)}
											{/if}
										{:else}
											{limitString(searchResults.songs.results[0].primaryArtists, 32)}
										{/if}
                                    </div>
                                </div>
                                <div class="topMostResultIcons" id="topMostResultIcons">
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                    <img on:click={() => fetchSong(searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].id : searchResults.songs.results[0].id)} draggable={false} id="topMostResultPlayButton" src={play} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="extendedIcons">
                            <img draggable={false} id="topMostResultFavButton" class="searchedIcons" src={unfav} alt="" />
                            <button on:click={() => location.href = `https://youtube.com/results?search_query=${searchResults.topQuery.results.length !== 0 ? searchResults.topQuery.results[0].title : searchResults.songs.results[0].title} by ${searchResults.topQuery.results[0].primaryArtists}`}>
                                <img class="extendedButtonIcons" id="youtubeIcon" alt="YouTube logo" src={youtube} />
                                Search YouTube
                            </button>
                            <button>
                                <img class="extendedButtonIcons" alt="Queue logo" src={add}/>
                                Add to queue
                            </button>
                            <img draggable={false} id="topMostResultOptionButton" class="searchedIcons" src={dots} alt="" />
                        </div>
                    </div>
				</section>
			<!-- {/if} -->


				<div class="categoryTitle">Songs</div>
				<section class="searchResultsContainer" id="topMostResultSongs">
					{#each searchResults.songs.results as element}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div on:click={() => fetchSong(element.id)} class="searchResults">
							{#if element.image[0].link}
								<div id="musicArtContainer">
									<object
										id="searchedMusicArt"
										data={element.image[0].link}
										type="image/png"
										aria-label="Song Art"
									>
										<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt={''} />
									</object>
								</div>
							{:else}
								<img id="searchedMusicArt" src={defaultImg} alt={defaultImg} />
							{/if}
							<div id="searchedSongInfo">
								<div id="actualInfo">
									<div id="searchedSongTitle">{limitString(element.title, 40)}</div>
									<div id="searchedSongArtist">{limitString(element.primaryArtists, 44)}</div>
								</div>
								<div class="topSearchIcons" id="searchedIcons">
									<img
										draggable={false}
										id="searchedOptionButton"
										class="searchedIcons"
										src={dots}
										alt=""
									/>
								</div>
							</div>
						</div>
					{/each}
				</section>


				<div id="albumsCategory" class="categoryTitle">Albums</div>
				<section id="topResultsAlbums">
					{#each searchResults.albums.results as element}
						<div class="searchAlbumResults">
							{#if element.image[1].link}
								<div id="albumArtContainer">
									<object
										id="searchedAlbumArt"
										data={element.image[1].link}
										type="image/png"
										aria-label="Album Art"
									>
										<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
									</object>
									<img draggable={false} id="searchedAlbumPlayButton" src={play} alt="" />
								</div>
							{:else}
								<img alt="Album art" src={defaultImg} class="searchAlbumResults" />
							{/if}
                                <div id="searchedAlbumInfo">
                                    <div id="searchedAlbumTitle">{limitString(element.title, 15)}</div>
                                    <div id="searchedAlbumArtist">{limitString(element.artist, 14)}</div>
                                </div>
						</div>
					{/each}
                    <div id="moreButton">
                        <a href="/explore/albums"><img alt="More" src={moreWhite} /></a>
                    </div>
				</section>

				<div id="artistsCategory" class="categoryTitle">Artists</div>
				<section id="artistsContainer">
					{#each searchResults.artists.results as element}
						<div class="searchAlbumResults">
							{#if element.image[1].link}
								<div id="artistArtContainer">
									<object
										id="searchedArtistArt"
										data={element.image[1].link}
										type="image/png"
										aria-label="Album Art"
									>
										<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
									</object>
									<img draggable={false} id="searchedAlbumPlayButton" src={play} alt="" />
								</div>
							{:else}
								<img alt="Album art" src={defaultImg} class="searchAlbumResults" />
							{/if}
                                <div id="searchedAlbumInfo">
                                    <div id="searchedAlbumTitle">{limitString(element.title, 18)}</div>
                                    <div id="searchedAlbumArtist">{limitString(element.description, 14)}</div>
                                </div>
						</div>
					{/each}
                    <div id="moreButton">
                        <a href="/explore/albums"><img alt="More" src={moreWhite} /></a>
                    </div>
				</section>
	</section>
	{/if}
</div>


<style>
	#mobileContents {
		display: none;
	}
	#contentsContainer {
		overflow: scroll;
		overflow-x: hidden;
		z-index: 0;
		display: flex;
		flex-direction: column;
        padding-bottom: 40px;
	}

	#contents {
		margin-top: 11vh;
		padding-bottom: 30px;
		display: flex;
	}
	#row {
		width: 39%;
		margin-left: 7vw;
	}

	#categoryContainer {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: -2vh;
	}

	#insideRow {
		margin-top: 8vh;
	}

	.categoryTitle {
		font-size: 1.6rem;
		font-family: 'Josefin Sans', sans-serif;
		margin-top: 20px;
		margin-bottom: 2vh;
	}
    #albumsCategory {
        margin-top: 8vh;
    }
    #artistsCategory {
        margin-top: 8vh;
    }

	.topMostResult {
		background: #171717;
		border-radius: 20em;
		display: flex;
		align-items: center;
		width: 100%;
		height: 13.2vh;
		overflow: hidden;
		border: 1px solid #444;
		filter: drop-shadow(0 0 20px #000);
	}

    #topMostResult {
		border-top-left-radius: 4em;
		border-top-right-radius: 4em;
		border-bottom-left-radius: 2em;
		border-bottom-right-radius: 2em;
		padding-bottom: 5px;
		padding-left: 4px;
		padding-right: 4px;
        overflow: hidden;
		margin-top: 5vh;
    }

    #topMostExtended {
        height: 21vh;
        width: 100%;
        background: #1c1c1c;
		border-bottom-left-radius: 2em;
		border-bottom-right-radius: 2em;
		filter: drop-shadow(0 0 20px #000);
    }
    #extendedIcons {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #extendedIcons > button {
		/* font-family: 'Josefin Sans', sans-serif; */
        margin: .8vw .6vw;
		color: #ccc;
        background: #242424;
        padding: .6vw .8vw;
        border-radius: .7em;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        font-size: 1em;
    }

    .extendedButtonIcons {
        width: 16px;
        margin-right: 8px;
    }

    #extendedIcons > button:hover {
        cursor: pointer;
        opacity: .5;
    }

    #youtubeIcon {
        margin-top: 3px;
    }

    #topMostResultIcons {
        width: 100%;
		margin-right: 40px;
		display: flex;
		justify-content: flex-end;
    }

    #topMostResultPlayButton {
        width: 25px;
    }

    #topMostResultFavButton {
        width: 22px;
        margin-right: .4vw;
    }
    #topMostResultOptionButton {
        width: 22px;
        margin-left: .4vw;
    }


	#topMostResultMusicArt {
		border-radius: 20em;
		background: #2a2a2a;
		height: 13.2vh;
		width: 13.2vh;
        box-shadow: 0 0 20px #000;
	}

	#topMostResultSongInfo {
		margin-left: .8em;
		display: flex;
		align-items: center;
		/* background: #f00; */
		height: 100%;
		width: 100%;
	}

	#topMostActualInfo {
		width: 100%;
		/* background: #0f0; */
  		white-space: nowrap;
	}

	#topMostResultSongTitle {
		max-height: 1em;
		margin-bottom: 0.4em;
		min-width: 10vw;
		width: 100%;
		border-radius: 20em;
		font-size: 24px;
		font-family: 'Josefin Sans', sans-serif;
		/* background: #0f0; */
	}
	#topMostResultSongArtist {
		max-height: 0.7em;
		/* min-width: 8vw; */
		width: 100%;
		/* background: #0f0; */
		border-radius: 20em;
		font-family: 'Josefin Sans', sans-serif;
		color: #8f49ff;
		/* background: #0f0; */
		font-size: 17px;
	}

	.searchResultsContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
	}
	.searchResults {
		height: 5.9vh;
		width: 100%;
		display: flex;
		padding: 0.7em 0.7em;
		margin-bottom: 0.4em;
		transition: 0.4s;
		/* border-bottom: 1px solid #383838; */
		border-radius: 14px;
		border: 1px solid transparent;
	}

	.topSearchIcons {
		margin-left: 10px;
	}

	#searchedIcons {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100px;
		width: 0;
		/* background: #0f0; */
		margin-right: 30px;
	}

	#searchedFavButton {
		opacity: 0;
        margin-right: .3vw;
	}

	#musicArtContainer {
		display: grid;
		align-items: center;
	}

    #albumArtContainer, #artistArtContainer, #songArtContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

	#searchedMusicArt {
		height: 50px;
		width: 50px;
		background: #2a2a2a;
		border-radius: 10px;
		grid-column: 1;
		grid-row: 1;
		margin-left: 0.5em;
	}

	#searchedPlayButton {
		width: 22px;
		grid-column: 1;
		grid-row: 1;
		margin-left: 23px;
		opacity: 0;
	}

	#actualInfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
	}

	#searchedSongInfo {
		width: 100%;
		display: flex;
		margin-left: 15px;
		font-size: 12px;
	}

	#searchedSongTitle {
		height: 14px;
		width: 100%;
		margin-bottom: 10px;
		font-size: 17px;
		white-space: nowrap;
	}

	#searchedSongArtist {
		height: 10px;
		width: 100%;
		opacity: 0.5;
		font-size: 14px;
	}

    #searchedAlbumArt {
        height: 15.4vh;
        width: 15.4vh;
        transition: 0.4s;
        border-radius: 10px;
        margin-top: 1.7vh;
        grid-column: 1;
        grid-row: 1;
    }
    #searchedArtistArt {
        height: 15.4vh;
        width: 15.4vh;
        transition: 0.4s;
        border-radius: 20rem;
        margin-top: 1.7vh;
        grid-column: 1;
        grid-row: 1;
    }

    #searchedAlbumPlayButton {
        width: 32px;
        grid-column: 1;
        grid-row: 1;
        margin-top: 8vh;
        opacity: 0;
        z-index: 5;
        position: absolute;
    }
    #nowPlaying {
		height: 13.2vh;
		width: 13.2vh;
        border-radius: 20rem;
    }
	#nowPlayingContainer {
		height: 13.2vh;
		width: 13.2vh;
		overflow: hidden;
        grid-column: 1;
        grid-row: 1;
        z-index: 5;
		opacity: .7;
        position: absolute;
	}
    .searchAlbumResults {
        height: 23.3vh;
        width: 9.5vw;
        background: #171717;
        border-radius: 20px;
    }

    #topResultsAlbums, #artistsContainer {
        display: grid;
        grid-template-columns: 11.2vw 11.2vw 11.2vw 3vw;
        margin: 40px 0;
        margin-bottom: 78px;
    }

    #searchedAlbumInfo {
        margin-left: 1.7vh;
        width: 200px;
    }

    #searchedAlbumTitle {
        font-size: 0.9rem;
        margin-top: 15px;
        font-family: 'Josefin Sans', sans-serif;
    }

    #searchedAlbumArtist {
        margin-top: 5px;
        font-size: 0.8rem;
        color: #999;
        font-family: 'Josefin Sans', sans-serif;
    }


	.searchedIcons {
		width: 21px;
	}

	#failedMusicArt {
		margin-left: -1px;
		height: 55px;
		width: 55px;
		border-radius: 12px;
		grid-column: 1;
		grid-row: 1;
	}

	.searchCategory {
		font-size: 1rem;
		white-space: nowrap;
		margin: 0 10px;
		opacity: 0.5;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		padding: 9px 20px;
	}
	.searchCategory > button {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 1rem;
		border: none;
		color: #fff;
		background: none;
	}

	#activeCategory {
		background: #eee;
		border-radius: 20px;
		opacity: 1;
		cursor: pointer;
	}

	#activeCategory > button {
		color: #000;
	}

	#searchBack {
		font-size: 20px;
		color: #777;
	}

	
	#searchBar {
		display: none;
	}
	#searchBox {
		padding: 7px;
		padding-left: 15px;
		height: 30px;
		width: 90%;
		font-size: 17px;
		outline: none;
		border-radius: 15px;
		margin-top: 15px;
		margin-bottom: 20px;
		caret-color: #6f16ff;
		border: 1px solid #444;
		filter: drop-shadow(0 0 20px #000);
		background: #1717171e;
		/* background: #171717b0; */
		backdrop-filter: blur(14px);
	}
	#searchBox:focus {
		box-shadow: 0 0 15px #000;
	}
	#clearBox {
		display: none;
	}

	@media (hover: hover) {
		.searchCategory:hover, .searchCategory > button:hover {
			cursor: pointer;
			opacity: 1;
		}
		.searchResults:hover > #musicArtContainer > #searchedMusicArt {
			opacity: 0.2;
		}

		.searchResults:hover > #musicArtContainer > #searchedPlayButton {
			opacity: 1;
		}

		.searchResults:hover > #searchedSongInfo > #searchedIcons > #searchedFavButton {
			opacity: 1;
		}

		#albumArtContainer:hover {
			cursor: pointer;
		}

		#albumArtContainer:hover > #searchedAlbumPlayButton {
			opacity: 1;
		}
		#albumArtContainer:hover > #searchedAlbumArt {
			opacity: 0.1;
		}
		#searchedAlbumPlayButton:hover {
			transform: scale(1.1);
		}

		.searchResults:hover {
			border: 1px solid #444;
			filter: drop-shadow(0 0 20px #000);
			background: #1717171e;
		}

		.searchedIcons:hover {
			transform: scale(1.1);
			cursor: pointer;
		}

		#searchBack:hover {
			cursor: pointer;
		}

		#musicArtContainer:hover {
			transform: scale(1.1);
			cursor: pointer;
		}
		#topMostResultPlayButton:hover {
			transform: scale(1.1);
			cursor: pointer;
		}
		#moreButton:hover {
			cursor: pointer;
			margin-left: 5px;
		}
	}

	@media only screen and (max-width: 1760px) {

		#topMostExtended {
			height: 20.5vh;
			width: 100%;
			border-bottom-left-radius: 2em;
			border-bottom-right-radius: 2em;
		}
		#extendedIcons {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		#extendedIcons > button {
			margin: 1vw 1vw;
			color: #ccc;
			background: #242424;
        	padding: .4vw .6vw;
			border-radius: .7em;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			font-size: .8rem;
		}

		.extendedButtonIcons {
			width: 13px;
			margin-right: 8px;
		}

		#topMostResultPlayButton {
			width: 22px;
		}

		#topMostResultFavButton {
			width: 18px;
			margin-right: 1%;
		}
		#topMostResultOptionButton {
			width: 18px;
			margin-left: 1%;
		}

	}

	@media only screen and (max-width: 1760px) {
		#extendedIcons > button {
			margin: 1vw .6vw;
			color: #ccc;
			background: #242424;
        	padding: .4vw .6vw;
			border-radius: .7em;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			font-size: .8rem;
		}
	}

	@media only screen and (max-width: 1380px) {
		#contents {
			flex-direction: column;
		}
		#row {
			width: 84%;
		}
	}

	@media only screen and (max-width: 970px) {
		#contents {
			display: none;
		}
		#mobileContents {
			display: block;
			margin-top: 70px;
			margin-bottom: 110px;
		}
		#contentsContainer {
			margin-left: -30px;
		}
		#searchBar {
			display: block;
		}
		#categoryContainer {
			margin-bottom: 30px;
		}
		.searchCategory {
			margin: 0 6px;
			padding: 8px 10px;
		}
		.searchCategory > button {
			font-size: .9rem;
		}
		#activeCategory {
			border-radius: 8px;
		}

		.topMostResult {
			background: #171717;
			border-radius: 20em;
			display: flex;
			align-items: center;
			width: 100%;
			height: 13.2vh;
			overflow: hidden;
			border: 1px solid #444;
			filter: none;
		}

		#topMostResult {
			width: 93%;
			margin-top: 24px;
		}

		#topMostExtended {
			height: 21vh;
			width: 100%;
			background: transparent;
			border: none;
			filter: none;
		}

		.categoryTitle {
			font-size: 1.3rem;
			margin-top: 20px;
			margin-bottom: 20px;
		}


		#extendedIcons {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 6px;
		}
		#extendedIcons > button {
			/* font-family: 'Josefin Sans', sans-serif; */
			margin: 2vw .6vw;
			color: #ccc;
			background: #242424;
			padding: 1.2vw 2vw;
			border-radius: .5em;
			display: flex;
			align-items: center;
			justify-content: center;
			border: none;
			font-size: .8em;
		}

		.extendedButtonIcons {
			width: 14px;
			margin-right: 8px;
		}

		#extendedIcons > button:hover {
			cursor: pointer;
			opacity: .5;
		}
		
		#topMostResultFavButton {
			width: 18px;
			margin-right: 2vw;
		}

		#topMostResultOptionButton {
			width: 18px;
			margin-left: 2vw;
		}



		

		.searchResultsContainer {
			width: 94%;
		}
		.searchResults {
			width: 96%;
			/* background: #0f0; */
			display: flex;
			align-items: center;
			justify-content: center;
			/* margin-left: -10px; */
			margin-bottom: .2em;
		}

		#searchedMusicArt {
			margin-left: 0em;
		}

		#searchedPlayButton {
			width: 18px;
			margin-right: 10px;
			opacity: 1;
		}
		#topMostResultSongs {
			width: 100%;
		}


		

		#topResultsAlbums, #artistsContainer {
			display: none;
			overflow-x: scroll;
			margin-left: 0;
			width: 100%;
			display: grid;
			grid-template-columns: auto auto auto auto;
			justify-content: flex-start;
			align-items: center;
			gap: 2vw;
			margin-left: -10px;
			margin-bottom: -20px;
		}
		#topResultsAlbums::-webkit-scrollbar, #artistsContainer::-webkit-scrollbar {
			display: none;
		}

		.searchAlbumResults {
			height: 229px;
			width: 180px;
			background: transparent;
			border-radius: 0;
		}

		#moreButton {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	

	}

	@media only screen and (max-width: 500px) {

		.categoryTitle {
			margin-left: 10px;
			font-size: 1.2em;
			margin-top: 10px;
		}

		.topMostResult {
			height: 9vh;
		}

		#topMostResult {
			border-radius: 0;
			margin-top: 30px;
			margin-bottom: -40px;
		}

		#nowPlayingContainer {
			height: 9vh;
			width: 9vh;
		}
		#nowPlaying {
			height: 9vh;
			width: 9vh;
		}

		#topMostResultMusicArt {
			height: 9vh;
			width: 9vh;
		}


		#albumsCategory {
        	margin-top: 4vh;
		}
		#artistsCategory {
			margin-top: 4vh;
		}

		#topMostResultIcons {
			margin-right: 22px;
		}

		#topMostResultPlayButton {
			width: 18px;
		}

	
		.searchCategory {
			margin: 0 4px;
			padding: 6px 8px;
		}

		.searchCategory > button {
			font-size: .8rem;
		}

		.searchResultsContainer {
			width: 100%;
			/* background-color: #ff0; */
		}
		.searchResults {
			width: 100%;
			/* background: #0f0; */
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 20px;
		}

		#searchedMusicArt {
			margin-left: 0;
		}

		#searchedPlayButton {
			width: 18px;
			margin-right: 10px;
			opacity: 1;
		}
		#topMostResultSongs {
			width: 100%;
		}

		
		#topMostResultSongTitle {
			font-size: .9em;
		}
		#topMostResultSongArtist {
			font-size: .7em;
		}


		
		#searchedSongTitle {
			font-size: 1em;
			margin-bottom: 4px;
		}

		#searchedSongArtist {
			font-size: .9em;
		}



		
		#topResultsAlbums, #artistsContainer {
			display: none;
			overflow-x: hidden;
			margin-left: 0;
			width: 100%;
			height: 100%;
			display: grid;
			grid-template-columns: auto auto;
			grid-template-rows: auto auto;
			justify-content: center;
			align-items: center;
			gap: 2vw;
		}
		#topResultsAlbums::-webkit-scrollbar, #artistsContainer::-webkit-scrollbar {
			display: none;
		}

		.searchAlbumResults {
			height: 229px;
			width: 180px;
			background: transparent;
			border-radius: 0;
		}

		#moreButton {
			display: flex;
			justify-content: center;
			align-items: center;
		}

	}
</style>
