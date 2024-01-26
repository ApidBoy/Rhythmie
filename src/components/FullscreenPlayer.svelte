<script>
	// @ts-nocheck

	import fav from '$lib/res/unfav.png';
	import dots from '$lib/res/dots.png';
	import shuffle from '$lib/res/shuffle.png';
	import prev from '$lib/res/prev.png';
	import play from '$lib/res/play.png';
	import pause from '$lib/res/pause.png';
	import next from '$lib/res/next.png';
	import repeat from '$lib/res/repeat.png';
	import pauseIcon from '$lib/res/pause-button.png';
	import playIcon from '$lib/res/play-button.png';
	import defaultImg from '$lib/res/default.png';
	import arrowIcon from '$lib/res/down.png';
	import { playerData, converter, limitString } from '../store';
	import PlayerSkeleton from './skeletons/PlayerSkeleton.svelte';

	let songDetails;
	let audio;
	let seekbar;
	let playButton;
	let currentDuration = '00:00';
	let playState = true;
	let playPauseIcon = play;

	playerData.subscribe((value) => {
		console.log('Player data: ', value);
		songDetails = value;
		setTimeout(() => {
			if (songDetails.length !== 0) {
				localStorage.setItem('mostRecentSong', JSON.stringify(songDetails.data[0]));
				playPause();
			}
		}, 1000);
	});

	let interval = () =>
		setInterval(() => {
			seekbar.value = audio.currentTime;
			currentDuration = converter(audio.currentTime);
			if (audio.currentTime >= songDetails.data[0].duration) {
				clearInterval(interval);
				playState = false;
				playPause();
			}
		}, 500);

	const updateSeek = () => {
		audio.currentTime = seekbar.value;
	};
	const playPause = () => {
		if (playState) {
			audio.play();
			interval();
			playState = false;
			playPauseIcon = pause;
			playButton.style.margin = '5px 2px';
		} else {
			audio.pause();
			playState = true;
			playPauseIcon = play;
			playButton.style.margin = '5px 10px';
		}
	};
</script>

<section id="playerContainer">
	{#if songDetails.length !== 0}
		<div id="songData">
			<div id="songArtContainer">
				<img
					src={songDetails.data[0].image[2].link}
					draggable={false}
					id="songArt"
					alt="Music art"
				/>
			</div>
			<div id="songInfo">
				<div id="songName">{limitString(songDetails.data[0].name, 20)}</div>
				<div id="songArtist">• {songDetails.data[0].primaryArtists}</div>
			</div>
			<div id="musicControls">
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<div id="musicComponent">
					<img draggable={false} id="shuffleButton" src={shuffle} alt="Shuffle" />
					<img draggable={false} id="prevButton" src={prev} alt="Previous" />
					<!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img draggable={false} id="favButton" src={fav} alt="" />
					<img draggable={false} id="nextButton" src={next} alt="Next" />
					<img draggable={false} id="repeatButton" src={repeat} alt="Repeat" />
				</div>
			</div>
		</div>
	{:else}
		<PlayerSkeleton />
	{/if}
	<div id="lyricsContainer">
		<div id="songLyrics">
			<div id="lyricsTitle">Lyrics</div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
			<div id="lyric"></div>
		</div>



        
	<div id="playQueueContainer">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div id="playQueue">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="playQueueTitle">Your Queue
				<img id="expand" src={arrowIcon} alt='' />
			</div>
			<div id="queueContainer">
				<div id="queueItem" class="activeItem">
					<div id="queueItemArtContainer">
						{#if songDetails.data.length !== 0}
							<object id="queueItemArt" data={songDetails.data[0].image[0].link} type="image/png" aria-label="">
								<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
							</object>
						{:else}
							<object id="queueItemArt" data={defaultImg} type="image/png" aria-label="">
								<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
							</object>
						{/if}
					</div>
					<div id="queueItemInfo">
						{#if songDetails.data.length !== 0}
							<div id="queueItemTitle">{limitString(songDetails.data[0].name, 16)}</div>
							<div id="queueItemArtist">{limitString(songDetails.data[0].primaryArtists, 16)}</div>
						{:else}
						<div id="queueItemTitle">Song name</div>
						<div id="queueItemArtist">Song Artist</div>
						{/if}

					</div>
					<div id="nowPlayingIconContainer">
						<img src={pauseIcon} id="nowPlayingIcon" alt='' />
					</div>
				</div>
				<div id="queueItem">
					<div id="queueItemArtContainer">
						<object id="queueItemArt" data={defaultImg} type="image/png" aria-label="">
							<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
						</object>
					</div>
					<div id="queueItemInfo">
						<div id="queueItemTitle">Song Name</div>
						<div id="queueItemArtist">Song Artist</div>
					</div>
					<div id="playIconContainer">
						<img src={playIcon} id="playIcon" alt='' />
					</div>
				</div>
				<div id="queueItem">
					<div id="queueItemArtContainer">
						<object id="queueItemArt" data={defaultImg} type="image/png" aria-label="">
							<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
						</object>
					</div>
					<div id="queueItemInfo">
						<div id="queueItemTitle">Song Name</div>
						<div id="queueItemArtist">Song Artist</div>
					</div>
					<div id="playIconContainer">
						<img src={playIcon} id="playIcon" alt='' />
					</div>
				</div>
				<div id="queueItem">
					<div id="queueItemArtContainer">
						<object id="queueItemArt" data={defaultImg} type="image/png" aria-label="">
							<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
						</object>
					</div>
					<div id="queueItemInfo">
						<div id="queueItemTitle">Song Name</div>
						<div id="queueItemArtist">Song Artist</div>
					</div>
					<div id="playIconContainer">
						<img src={playIcon} id="playIcon" alt='' />
					</div>
				</div>
				<div id="queueItem">
					<div id="queueItemArtContainer">
						<object id="queueItemArt" data={defaultImg} type="image/png" aria-label="">
							<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
						</object>
					</div>
					<div id="queueItemInfo">
						<div id="queueItemTitle">Song Name</div>
						<div id="queueItemArtist">Song Artist</div>
					</div>
					<div id="playIconContainer">
						<img src={playIcon} id="playIcon" alt='' />
					</div>
				</div>
				<div id="clearQueue">
					<div id="clearQueueButton">
						Clear queue
					</div>
				</div>
			</div>
			<div id="emptyQueue">
				<div id="createQueueButton">
					Create a queue
				</div>
			</div>
		</div>
	</div>
	</div>
</section>

<style>
	#playerContainer {
		height: 93vh;
		width: 100vw;
		display: flex;
		justify-content: start;
		align-items: center;
		backdrop-filter: blur(10px);
	}
	#songData {
		display: flex;
		align-items: end;
	}
	#songArtContainer {
		min-height: 400px;
		min-width: 400px;
		max-height: 400px;
		max-width: 400px;
		overflow: hidden;
		z-index: 0;
	}
	#songArt {
		height: 100%;
		width: 100%;
		border-radius: 1.6rem;
	}
	#songInfo {
		height: 30%;
		width: 100%;
		margin-left: 3.5%;
		z-index: 1;
		margin-bottom: 3em;
	}
	#songName {
		height: 30%;
		width: 150%;
		/* background: #fff; */
		border-radius: 2rem;
		margin-top: 2%;
		margin-bottom: 1%;
		font-family: 'Josefin Sans', sans-serif;
		font-size: 4rem;
	}
	#songArtist {
		margin-top: 0.7em;
		margin-left: 0.1em;
		border-radius: 2rem;
		color: #8f49ff;
		font-family: 'Josefin Sans', sans-serif;
		font-size: 2rem;
		width: 35vw;
	}
	#musicControls {
        display: none;
		height: 0;
        width: 100%;
        flex-direction: column;
        margin-top: -22vh;
	}
    #favButton {
        margin-top: 10px;
		width: 18px;
    }
	#nextButton,
	#prevButton {
		transition: 0.4s;
		width: 16px;
		margin: 0 14px;
	}
	#repeatButton,
	#shuffleButton {
		width: 14px;
		margin: 0 0px;
	}
	#songLyrics {
		min-height: 500px;
		min-width: 400px;
		max-height: 500px;
		max-width: 400px;
        background: #1717179f;
		margin: 10px;
		border-radius: 20px;
        transform: translateY(-50%);
		position: absolute;
        top: 50%;
		right: 10vw;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		backdrop-filter: blur(20px);
		border: 1px solid #444;
	}
	#lyricsTitle {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 1.8rem;
		margin: 20px 0;
		margin-left: 5%;
	}
	#lyric {
		height: 80px;
		width: 90%;
		background: #333;
		margin-bottom: 20px;
		border-radius: 5px;
		margin-left: 5%;
	}


    
	#playQueueContainer {
        display: none;
		width: 90%;
		border-radius: 20px;
		overflow: hidden;
		padding-right: 20px;
		border: 1px solid #444;
        position: relative;
        top: 10.5vh;
        background: #1717179f;
		backdrop-filter: blur(20px);
	}
	#playQueue {
		padding-left: 10px;
		width: 100%;
		margin-bottom: 12px;
	}
	#playQueueTitle {
		font-size: 17px;
		margin-top: 20px;
		margin-left: 10px;
	}
	#playQueueTitle > img {
		float: right;
		margin-right: 6px;
		width: 24px;
		transform: rotate(180deg);
	}

	#emptyQueue {
		display: none;
		flex-direction: column;
	}

	#createQueueButton {
		font-size: 17px;
		color: #999;
	}

	#clearQueueButton {
		font-size: 15px;
		color: #999;
		width: 100%;
		display: none;
	}

	#queueContainer {
		margin-top: 20px;
	}

	#queueItem {
		display: flex;
		align-items: center;
		height: 50px;
		border-radius: 14px;
		margin-bottom: 8px;
		transition: .2s;
	}
	.activeItem {
		background: #222;
	}
	#queueItemArtContainer {
		display: flex;
		margin-left: 10px;
	}
	#queueItemArt {
		width: 35px;
		height: 35px;
		border-radius: 150px;
	}
	#queueItemTitle {
		font-size: .8em;
		margin-bottom: 2px;
	}
	#queueItemArtist {
		font-size: .7em;
		color: #999;
	}
	#queueItemInfo {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		width: 100%;
	}

	#nowPlayingIcon {
		width: 20px;
		padding-right: 12px;
	}

	#playIcon {
		width: 20px;
		padding-right: 12px;
		opacity: 0;
	}



	@media only screen and (max-width: 970px) {
		#playerContainer {
			flex-direction: column;
			height: 189vh;
			align-items: center;
			margin-left: -7vw;
            padding-bottom: 130px;
		}
		#songArtContainer {
			min-height: 20em;
			min-width: 20em;
			max-height: 20em;
			max-width: 20em;
			overflow: hidden;
			z-index: 0;
		}
        #songArt {
            border-radius: .8rem;
        }
		#songLyrics {
			/* display: none; */
			position: relative;
		}
		#songData {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 0;
			height: 85vh;
		}
		#songInfo {
			margin-left: 0;
		}
		#songName {
			height: 11%;
			width: 100%;
			/* background: #fff; */
			border-radius: 2rem;
			margin-top: 8%;
			margin-bottom: 1%;
			font-family: 'Josefin Sans', sans-serif;
			font-size: 1.4rem;
		}
		#songArtist {
			margin-top: 0.7em;
			margin-left: 0.1em;
			border-radius: 2rem;
			color: #8f49ff;
			font-family: 'Josefin Sans', sans-serif;
			font-size: .9rem;
			width: 100%;
		}
        #musicControls {
		    display: flex;
        }
		#lyricsContainer {
			display: flex;
			/* justify-content: center; */
			align-items: center;
            flex-direction: column;
		}
		#songLyrics {
			min-height: 50vh;
			min-width: 90vw;
			max-height: 50vh;
			max-width: 90vw;
            background: #1717179f;
            margin: 10px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            backdrop-filter: blur(20px);
            transform: none;
            position: relative;
            top: 10vh;
            right: .4vw;
		}
		#lyricsTitle {
			font-family: 'Josefin Sans', sans-serif;
			font-size: 1.4rem;
			margin: 20px 0;
			margin-left: 5%;
		}
        
        #playQueueContainer {
            display: flex;
        }
    }
</style>
