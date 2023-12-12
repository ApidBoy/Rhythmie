<script>
// @ts-nocheck

    import { searchStore } from "../../../store";
    let searchText = '';
    
    searchStore.subscribe((value) => {
        searchText = value;
    })

</script>



<div id="contentsContainer">
    <section id="contents">

        <section id="row">
            
            <div id="categoryContainer">
                <span id="searchBack" class="material-symbols-outlined">
                    arrow_back_ios
                </span>
                <div id="activeCategory" class="searchCategory">
                    <a href="/">Top Results</a>
                </div>
                <div class="searchCategory">
                    <a href="/">Songs</a>
                </div>
                <div class="searchCategory">
                    <a href="/">Albums</a>
                </div>
                <div class="searchCategory">
                    <a href="/">Artists</a>
                </div>
            </div>

            <div id="insideRow">

                <div class="categoryTitle">Top Result for "{searchText}"</div>
                <section class="searchResultsContainer" id="topMostResult">
                    <div class="topMostResult">
                        <div id="topMostResultMusicArt"></div>
                        <div id="topMostResultSongInfo">
                            <div>
                                <div id="topMostResultSongTitle"></div>
                                <div id="topMostResultSongArtist"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="categoryTitle">Songs</div>
                <section class="searchResultsContainer">
                    <div class="searchResults">
                        <div id="searchedMusicArt"></div>
                        <div id="searchedSongInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    </div>
                    <div class="searchResults">
                        <div id="searchedMusicArt"></div>
                        <div id="searchedSongInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    </div>
                    <div class="searchResults">
                        <div id="searchedMusicArt"></div>
                        <div id="searchedSongInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    </div>
                </section>
            </div>
        </section>

        <section id="row">
            <div id="insideRow">

                <div class="categoryTitle">Albums</div>
                <section class="searchResultsContainer" id="topResultsAlbums">
                    <div class="searchAlbumResults">
                        <div id="searchedAlbumArt"></div>
                        <div id="searchedAlbumInfo">
                            <div id="searchedAlbumTitle"></div>
                            <div id="searchedAlbumArtist"></div>
                        </div>
                    </div>
                    <div class="searchAlbumResults">
                        <div id="searchedAlbumArt"></div>
                        <div id="searchedAlbumInfo">
                            <div id="searchedAlbumTitle"></div>
                            <div id="searchedAlbumArtist"></div>
                        </div>
                    </div>
                    <div class="searchAlbumResults">
                        <div id="searchedAlbumArt"></div>
                        <div id="searchedAlbumInfo">
                            <div id="searchedAlbumTitle"></div>
                            <div id="searchedAlbumArtist"></div>
                        </div>
                    </div>

                </section>

                <div class="categoryTitle">Artists</div>
                <section class="searchResultsContainer">

                        <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                            <div id="searchedSongInfo">
                                <div id="searchedSongTitle"></div>
                                <div id="searchedSongArtist"></div>
                            </div>
                        </div>
                        <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                            <div id="searchedSongInfo">
                                <div id="searchedSongTitle"></div>
                                <div id="searchedSongArtist"></div>
                            </div>
                        </div>
                        <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                            <div id="searchedSongInfo">
                                <div id="searchedSongTitle"></div>
                                <div id="searchedSongArtist"></div>
                            </div>
                        </div>
                </section>
            </div>
        </section>
        
    </section>
</div>


<style>

#contentsContainer {
    overflow: scroll;
    overflow-x: hidden;
    z-index: 0;
    display: flex;
    flex-direction: column;
}

#contents {
    margin-top: 11vh;
    padding-bottom: 30px;
    display: flex;
}
#row {
    width: 40%;
    margin-left: 5vw;
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

.topMostResult {
    background: #171717;
    border-radius: 20em;
    margin-top: 4vh;
    margin-bottom: 8vh;
    display: flex;
    align-items: center;
    width: 100%;
    height: 13.2vh;
    overflow: hidden;
}

#topMostResultMusicArt {
    border-radius: 20em;
    background: #2a2a2a;
    height: 13.2vh;
    width: 13.2vh;
}

#topMostResultSongInfo {
    margin-left: 1.4em;
    display: flex;
}
#topMostResultSongTitle {
    height: 1em;
    background: #2a2a2a;
    margin-bottom: 1em;
    width: 20em;
    border-radius: 20em;
}
#topMostResultSongArtist {
    height: .7em;
    background: #2a2a2a;
    width: 12em;
    border-radius: 20em;
}

.searchResultsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 200px;
}
.searchResults {
    height: 5.9vh;
    width: 100%;
    display: flex;
    align-items: center;
    padding: .7em .7em;
    margin-bottom: .4em;
    transition: .4s;
    border-bottom: 1px solid #151515;
    border-radius: 20em;
}
#searchedMusicArt {
    height: 50px;
    width: 50px;
    background: #2a2a2a;
    border-radius: 10px;
}

#searchedSongInfo {
    margin-left: 15px;
}

#searchedSongTitle {
    height: 14px;
    width: 200px;
    background: #2a2a2a;
    margin-bottom: 10px;
    border-radius: 100px;
}

#searchedSongArtist {
    height: 10px;
    width: 100px;
    background: #2a2a2a;
    border-radius: 100px;
}

#searchedAlbumArt {
    height: 150px;
    width: 150px;
    transition: 0.4s;
    border-radius: 10px;
    margin-top: 15px;
    grid-column: 1;
    grid-row: 1;
    background: #2a2a2a;
}

.searchAlbumResults {
    height: 227px;
    width: 180px;
    text-align: left;
    background: #171717;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#topResultsAlbums {
    display: grid;
    grid-template-columns: 11.2vw 11.2vw 11.2vw;
    margin: 40px 0;
    margin-left: -40px;
    margin-bottom: 78px;
}


#searchedAlbumTitle {
    margin-top: 15px;
    height: 1.4vh;
    width: 7vw;
    border-radius: 20em;
    background: #2a2a2a;
}

#searchedAlbumArtist {
    margin-top: 5px;
    height: 1.4vh;
    width: 80%;
    border-radius: 20em;
    background: #2a2a2a;
}




.searchCategory {
    font-size: 1rem;
    margin: 0 10px;
    opacity: .5;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 9px 20px;
}
.searchCategory > a {
    font-family: 'Josefin Sans', sans-serif;
}

#activeCategory {
    background: #eee;
    border-radius: 20px;
    opacity: 1;
    cursor: pointer;
}

#activeCategory > a {
    color: #000;

}

#searchBack {
    font-size: 20px;
    color: #777;
}

</style>