
<div id="contentsContainer">
    <section id="contents">

    <section id="row">
        
        <div id="searchedTitle">
            <span id="searchBack" class="material-symbols-outlined">
                arrow_back_ios
            </span>
            <div id="activeMusicTitle" class="searchedMusicTitle">
                <a href="/">Top Results</a>
            </div>
            <div class="searchedMusicTitle">
                <a href="/">Songs</a>
            </div>
            <div class="searchedMusicTitle">
                <a href="/">Albums</a>
            </div>
            <div class="searchedMusicTitle">
                <a href="/">Artists</a>
            </div>
        </div>
        <div class="topSearchTitle" id="songsTitle"></div>
        <section class="topSearchResults" id="topMostResult">
            <div class="topMostResult">
                <div id="topMostResultMusicArt"></div>
                <div id="topMostResultSongInfo">
                    <div id="topMostResultInfo">
                        <div id="topMostResultSongTitle"></div>
                        <div id="topMostResultSongArtist"></div>
                    </div>
                </div>
            </div>

        </section>

        <div class="topSearchTitle" id="songsTitle"></div>
        <section class="topSearchResults" id="topResultsSongs">
                <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                    <div id="searchedSongInfo">
                        <div id="actualInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    <div class="topSearchIcons" id="searchedIcons">
                        <div draggable={false} id="searchedFavButton" class="searchedIcons"></div>
                        <div draggable={false} id="searchedOptionButton" class="searchedIcons"></div>
                    </div>
                    </div>
                </div>
                <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                    <div id="searchedSongInfo">
                        <div id="actualInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    <div class="topSearchIcons" id="searchedIcons">
                        <div draggable={false} id="searchedFavButton" class="searchedIcons"></div>
                        <div draggable={false} id="searchedOptionButton" class="searchedIcons"></div>
                    </div>
                    </div>
                </div>
                <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                    <div id="searchedSongInfo">
                        <div id="actualInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    <div class="topSearchIcons" id="searchedIcons">
                        <div draggable={false} id="searchedFavButton" class="searchedIcons"></div>
                        <div draggable={false} id="searchedOptionButton" class="searchedIcons"></div>
                    </div>
                    </div>
                </div>

        </section>
    </section>
    <section id="row">

        <div class="topSearchTitle" id="songsTitle"></div>
        <section class="topSearchResults" id="topResultsAlbums">
            <div class="searchAlbumResults">
                    <div id="searchedAlbumArt"></div>
                <div id="searchedAlbumInfo">
                    <div id="actualInfo">
                        <div id="searchedAlbumTitle"></div>
                        <div id="searchedAlbumArtist"></div>
                    </div>
                </div>
            </div>
            <div class="searchAlbumResults">
                    <div id="searchedAlbumArt"></div>
                <div id="searchedAlbumInfo">
                    <div id="actualInfo">
                        <div id="searchedAlbumTitle"></div>
                        <div id="searchedAlbumArtist"></div>
                    </div>
                </div>
            </div>
            <div class="searchAlbumResults">
                    <div id="searchedAlbumArt"></div>
                <div id="searchedAlbumInfo">
                    <div id="actualInfo">
                        <div id="searchedAlbumTitle"></div>
                        <div id="searchedAlbumArtist"></div>
                    </div>
                </div>
            </div>

        </section>

        <div class="topSearchTitle" id="songsTitle"></div>
        <section class="topSearchResults" id="topResultsSongs">

                <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                    <div id="searchedSongInfo">
                        <div id="actualInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    <div class="topSearchIcons" id="searchedIcons">
                        <div draggable={false} id="searchedFavButton" class="searchedIcons"></div>
                        <div draggable={false} id="searchedOptionButton" class="searchedIcons"></div>
                    </div>
                    </div>
                </div>
                <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                    <div id="searchedSongInfo">
                        <div id="actualInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    <div class="topSearchIcons" id="searchedIcons">
                        <div draggable={false} id="searchedFavButton" class="searchedIcons"></div>
                        <div draggable={false} id="searchedOptionButton" class="searchedIcons"></div>
                    </div>
                    </div>
                </div>
                <div class="searchResults">
                            <div id="searchedMusicArt"></div>
                    <div id="searchedSongInfo">
                        <div id="actualInfo">
                            <div id="searchedSongTitle"></div>
                            <div id="searchedSongArtist"></div>
                        </div>
                    <div class="topSearchIcons" id="searchedIcons">
                        <div draggable={false} id="searchedFavButton" class="searchedIcons"></div>
                        <div draggable={false} id="searchedOptionButton" class="searchedIcons"></div>
                    </div>
                    </div>
                </div>
        </section>
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
    margin-top: 12vh;
    padding-bottom: 30px;
    display: flex;
}
#row {
    width: 40%;
    margin-left: 5vw;
}

.topMostResult {
    background: #171717;
    border-radius: 20em;
    margin-top: 4vh;
    margin-bottom: 7vh;
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

.topSearchResults {
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
    border-radius: 100px;
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
    height: 9.4vw;
    width: 9.4vw;
    background: #171717;
    border-radius: 20px;
    grid-column: 1;
    grid-row: 1;
}

#topResultsAlbums {
    display: grid;
    grid-template-columns: 11.2vw 11.2vw 11.2vw;
    margin: 60px 0;
}


#searchedAlbumTitle {
    font-size: 18px;
    margin-top: 12px;
}

#searchedAlbumArtist {
    margin-top: 4px;
    color: #999;
    font-size: 14px;
}





#searchedTitle {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
}

.searchedMusicTitle {
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
.searchedMusicTitle > a {
    font-family: 'Josefin Sans', sans-serif;
}

#activeMusicTitle {
    background: #eee;
    border-radius: 20px;
    opacity: 1;
    cursor: pointer;
}

#activeMusicTitle > a {
    color: #000;

}

#searchBack {
    font-size: 20px;
    color: #777;
}

</style>