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

	console.log('Search results - ', searchResults);
</script>

<div id="contentsContainer">
	<section id="contents">
		<section id="row">
			<div id="categoryContainer">
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click={() => goto('/explore')} id="searchBack" class="material-symbols-outlined"> arrow_back_ios </span>
				<div id="activeCategory" class="searchCategory">
					<a href="/explore/topresults">Top Results</a>
				</div>
				<div class="searchCategory">
					<a href="/explore/songs">Songs</a>
				</div>
				<div class="searchCategory">
					<a href="/explore/albums">Albums</a>
				</div>
				<div class="searchCategory">
					<a href="/explore/artists">Artists</a>
				</div>
			</div>

			<div id="insideRow">
				<div class="categoryTitle">Top Result for "{searchText}"</div>
				<section class="searchResultsContainer" id="topMostResult">
                    <div id="topMostExtended">
                        <div class="topMostResult">
							<div id="songArtContainer">
								<object
									id="topMostResultMusicArt"
									data={searchResults.topQuery.results[0].image[1].link}
									type="image/png"
									aria-label="Song Art"
								>
									<img id="failedMusicArt" src={defaultImg} onError={defaultImg} alt="" />
								</object>
								{#if playerDataVariable.length !== 0 && searchResults.topQuery.results[0].id === playerDataVariable.data[0].id}
								<div id="nowPlayingContainer">
									<img draggable={false} id="nowPlaying" src={now} alt="" />
								</div>
								{/if}
							</div>
                            <div id="topMostResultSongInfo">
                                <div id="topMostActualInfo">
                                    <div id="topMostResultSongTitle">
                                        {searchResults.topQuery.results[0].title}
                                    </div>
                                    <div id="topMostResultSongArtist">
                                        {#if searchResults.topQuery.results[0].type === "artist"}
                                            {searchResults.topQuery.results[0].description}
                                        {:else}
                                            {searchResults.topQuery.results[0].primaryArtists}
                                        {/if}
                                    </div>
                                </div>
                                <div class="topMostResultIcons" id="topMostResultIcons">
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                    <img on:click={() => fetchSong(searchResults.topQuery.results[0].id)} draggable={false} id="topMostResultPlayButton" src={play} alt="" />
                                </div>
                            </div>
                        </div>
                        <div id="extendedIcons">
                            <img draggable={false} id="topMostResultFavButton" class="searchedIcons" src={unfav} alt="" />
                            <button on:click={() => location.href = `https://youtube.com/results?search_query=${searchResults.topQuery.results[0].title} by ${searchResults.topQuery.results[0].primaryArtists}`}>
                                <img class="extendedButtonIcons" id="youtubeIcon" alt="YouTube logo" src={youtube} />
                                Search YouTube
                            </button>
                            <button on:click={() => location.href = `https://genius.com/search?q=${searchResults.topQuery.results[0].primaryArtists}`}>
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
</div>

<style>
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
        box-shadow: 0 0 30px #000;
	}

    #topMostResult {
		border-top-left-radius: 4em;
		border-top-right-radius: 4em;
        overflow: hidden;
		margin-top: 5vh;
    }

    #topMostExtended {
        height: 21vh;
        width: 100%;
        background: #1c1c1c;
		border-bottom-left-radius: 2em;
		border-bottom-right-radius: 2em;
    }
    #extendedIcons {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #extendedIcons > button {
		/* font-family: 'Josefin Sans', sans-serif; */
        margin: 18px 10px;
		color: #ccc;
        background: #242424;
        padding: 10px 14px;
        border-radius: .7em;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        font-size: 1rem;
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
        animation: topMostResultIcons 6s;
        width: 150px;
        margin-left: -12%;
        margin-top: 1%;
    }

    @keyframes topMostResultIcons {
        from {
            display: none;
        }
        to {
            display: block;
        }
    }

    #topMostResultPlayButton {
        width: 25px;
        margin-top: .3vh;
        margin-left: 3.2vw;
    }

    #topMostResultFavButton {
        width: 22px;
        margin-right: 1.2vw;
    }
    #topMostResultOptionButton {
        width: 22px;
        margin-left: 1.2vw;
    }


	#topMostResultMusicArt {
		border-radius: 20em;
		background: #2a2a2a;
		height: 13.2vh;
		width: 13.2vh;
        box-shadow: 0 0 20px #000;
	}

	#topMostResultSongInfo {
		margin-left: 1.4em;
		display: flex;
	}
	#topMostResultSongTitle {
		max-height: 1em;
		margin-bottom: 0.4em;
		min-width: 20em;
		border-radius: 20em;
		font-size: 24px;
		font-family: 'Josefin Sans', sans-serif;
	}
	#topMostResultSongArtist {
		max-height: 0.7em;
		min-width: 12em;
		border-radius: 20em;
		font-family: 'Josefin Sans', sans-serif;
		color: #8f49ff;
		font-size: 17px;
	}

	.searchResultsContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.searchResults {
		height: 5.9vh;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0.7em 0.7em;
		margin-bottom: 0.4em;
		transition: 0.4s;
		border-bottom: 1px solid #151515;
		border-radius: 14px;
	}

	.topSearchIcons {
		margin-left: 110px;
	}

	#searchedIcons {
		display: flex;
		align-items: center;
		height: 100px;
		width: 100px;
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
		width: 23.5vw;
	}

	#searchedSongInfo {
		display: flex;
		margin-left: 15px;
		font-size: 12px;
	}

	#searchedSongTitle {
		height: 14px;
		min-width: 200px;
		margin-bottom: 10px;
		font-size: 17px;
	}

	#searchedSongArtist {
		height: 10px;
		min-width: 100px;
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
		margin: 0 10px;
		opacity: 0.5;
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

	@media (hover: hover) {
		.searchCategory:hover {
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
			background: #181818;
			box-shadow: 0 0 20px #111;
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
</style>
