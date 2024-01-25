<script>
	// @ts-nocheck

	import fav from '$lib/res/unfav.png';
	import dots from '$lib/res/dots.png';
	import volumeButton from '$lib/res/volume.png';
	import defaultImg from '$lib/res/default.png';
	import shuffle from '$lib/res/shuffle.png';
	import prev from '$lib/res/prev.png';
	import play from '$lib/res/play.png';
	import pause from '$lib/res/pause.png';
	import next from '$lib/res/next.png';
	import repeat from '$lib/res/repeat.png';
	import uparrow from '$lib/res/up-arrow.png';
	import { playerData, converter } from '../store';
	import PlayerSkeleton from './skeletons/PlayerSkeleton.svelte';
	import { onMount } from 'svelte';
	import { activeRouteDerived, setActiveRoute } from '../activeRoute';

	let activeRoute = '';
	let fullscreenPlayerToggle = true;

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	const handleNavigation = (route) => {
		setActiveRoute(route);
	};

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

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
				document.getElementById('songName').innerHTML = songDetails.data[0].name;
				document.getElementById('songArtist').innerHTML = songDetails.data[0].primaryArtists;
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
	const handleArtClick = () => {
		if(fullscreenPlayerToggle) {
			document.getElementById('songArt').style.opacity = .4;
			document.getElementById('uparrow').style.opacity = 1;
			document.getElementById('songInfo').style.top = "14px";
			document.getElementById('songName').innerHTML = "Now playing";
			document.getElementById('songArtist').style.visibility = "hidden";
			// document.getElementById('songArtist').innerHTML = "Click on this button to disable";
			handleNavigation('/nowplaying');
			fullscreenPlayerToggle = false;
		} else {
			document.getElementById('songArt').style.opacity = 1;
			document.getElementById('uparrow').style.opacity = 0;
			document.getElementById('songInfo').style.top = "0";
			document.getElementById('songArtist').style.visibility = "visible";
			document.getElementById('songName').innerHTML = songDetails.data[0].name;
			document.getElementById('songArtist').innerHTML = songDetails.data[0].primaryArtists;
			window.history.back();
			fullscreenPlayerToggle = true;
		}
	}
</script>

{#if songDetails.length !== 0}
	<div id="bottomBar">
		<audio bind:this={audio} src={songDetails.data[0].downloadUrl[2].link}></audio>
		<div id="musicInfo">
			<a href="/nowplaying" id="songArtContainer" class:active={activeRoute.includes('/nowplaying')} on:click={handleArtClick}>	
				<img id="uparrow" src={uparrow} alt=''/>
				<img src={songDetails.data[0].image[1].link} draggable={false} id="songArt" alt="Music art" />
			</a>
			<div id="songInfo">
				<div id="songTitle">
					<span id="songName">{songDetails.data[0].name}</span>
					<div id="songArtist">{songDetails.data[0].primaryArtists}</div>
				</div>
			</div>
		</div>
		<div id="musicControls">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<div id="musicComponent">
				<img draggable={false} id="shuffleButton" src={shuffle} alt="Shuffle" />
				<img draggable={false} id="prevButton" src={prev} alt="Previous" />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					draggable={false}
					id="playPause"
					src={playPauseIcon}
					alt="Play/Pause Button"
					on:click={playPause}
					bind:this={playButton}
				/>
				<img draggable={false} id="nextButton" src={next} alt="Next" />
				<img draggable={false} id="repeatButton" src={repeat} alt="Repeat" />
			</div>
		</div>
		<div id="totalSeek">
			<div id="currentDuration">{currentDuration}</div>
			<input
				bind:this={seekbar}
				on:input={updateSeek}
				id="seekBar"
				type="range"
				min="0"
				max={songDetails.data[0].duration}
				step="1"
				value="0"
			/>
			<div id="totalDuration">{converter(songDetails.data[0].duration)}</div>
		</div>
		<div id="bottomIcons">
			<img draggable={false} id="favButton" src={fav} alt="" />
			<img draggable={false} id="bottomMenu" src={dots} alt="" />
			<img draggable={false} id="volumeButton" src={volumeButton} alt="" />

			<div id="sliderContainer">
				<input id="volumeSlider" type="range" min="0.0" max="1.0" step="0.1" value="1" />
			</div>
		</div>
	</div>
{:else}
	<PlayerSkeleton />
{/if}

<style>
	#bottomBar {
		width: 100%;
		height: 100px;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		flex-direction: column;
		z-index: 5;
		/* background: #0a0a0a6b; */
		background: #0a0a0ae0;
		backdrop-filter: blur(12px) brightness(90%);
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
		border: 1px solid #444;
		background: #070707c4;
	}

	#musicComponent {
		margin: 18px 20px 20px 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#playPause {
		width: 26px;
		margin: 5px 2px;
	}
	#playPause:hover {
		transform: scale(1.08);
		cursor: pointer;
	}
	#nextButton,
	#prevButton {
		transition: 0.4s;
		width: 20px;
		margin-left: 15px;
		margin-right: 15px;
	}
	#repeatButton,
	#shuffleButton {
		width: 18px;
	}

	#musicInfo {
		font-size: 20px;
		position: absolute;
		left: 0;
		bottom: 28px;
		color: #fff;
	}
	#songArtContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		position: absolute;
		left: 20px;
		bottom: 0px;
	}
	#uparrow {
		z-index: 2;
		position: absolute;
		opacity: 0;
	}
	#songArt {
		height: 70px;
		width: 70px;
		background: #000;
		z-index: 5;
		border-radius: 0.8rem;
		z-index: 1;
		opacity: 1;
	}
	#songArtContainer:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
	#songArtContainer:hover > #songArt {
		opacity: .4;
	}
	#songArtContainer:hover > #uparrow {
		opacity: 1;
	}
	#songInfo {
		position: relative;
		left: 110px;
		width: 100%;
		transition: .4s;
	}
	#songTitle {
		text-shadow: 0 0 10px #777;
	}
	#songTitle > span {
		font-family: 'Josefin Sans', sans-serif;
	}
	#songArtist {
		margin-top: 4px;
		font-size: 17px;
		color: #8f49ff;
		font-family: 'Josefin Sans', sans-serif;
		text-shadow: 0 0 7px #242424;
	}
	#songArtist:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	#totalSeek {
		width: 40vw;
		height: 5px;
		position: absolute;
		bottom: 20px;
		z-index: 2;
		transition: 0.2s;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#totalSeek > div {
		font-family: 'Montserrat', sans-serif;
		font-size: 0.8rem;
		width: 3rem;
		overflow: hidden;
	}
	#seekBar {
		-webkit-appearance: none;
		width: 100%;
		height: 100%;
		transition: 0.4s;
		overflow: hidden;
		background-color: #333;
		border-radius: 30px;
		margin-left: 10px;
		margin-right: 16px;
	}
	#seekBar::-webkit-slider-thumb {
		-webkit-appearance: none;
		user-select: none;
		height: 20px;
		width: 0px;
		background: #000;
		box-shadow: -100vw 0 0 100vw #8b42ff;
	}
	#seekBar:hover {
		cursor: pointer;
		height: 10px;
	}
	#bottomIcons {
		position: absolute;
		bottom: 35px;
		right: 144px;
	}
	#bottomIcons > img {
		width: 25px;
	}
	#volumeSlider {
		-webkit-appearance: none;
		-moz-appearance: none;
		background-color: #333;
		border-radius: 20px;
		position: fixed;
		bottom: 44%;
		right: 20px;
		overflow: hidden;
		transition: 0.4s;
	}
	#volumeSlider::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: #8b42ff;
		box-shadow: -100vw 0 0 100vw #8b42ff;
		height: 10px;
		width: 20px;
		border-radius: 20px;
	}
	#volumeSlider:hover {
		cursor: pointer;
		transform: scale(1.05);
		box-shadow: 0 0 7px #555;
	}
	#volumeButton {
		transition: 0.3s;
		position: relative;
		right: 22px;
	}
	#volumeButton:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	#bottomMenu {
		transition: 0.3s;
		position: relative;
		right: 25px;
	}
	#bottomMenu:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	#favButton {
		transition: 0.3s;
		transform: scale(0.95);
		position: relative;
		right: 28px;
	}
	#favButton:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
	@media only screen and (max-width: 970px) {
		#bottomBar {
			bottom: 11%;
			left: 5%;
			border-radius: 20px;
			height: 85px;
			width: 90%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			overflow: hidden;
		}
		#totalSeek {
			width: 102%;
			bottom: 0;
			background: transparent;
		}
		#seekBar {
			background: transparent;
		}
		#currentDuration, #totalDuration {
			display: none;
		}
		#bottomIcons {
			display: none;
		}
		#musicControls {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
		#shuffleButton, #repeatButton, #prevButton {
			display: none;
		}
		#musicComponent > img {
			width: 22px;
			margin-right: 1px;
		}
		#musicComponent {
			margin-right: 20px;
		}
		#songArtContainer {
			left: 14px;
		}
		#songArt {
			height: 55px;
			width: 55px;
		}
		#musicInfo {
			bottom: 22px;
		}
		#songInfo {
			left: 86px;
		}
	}
	@media only screen and (max-width: 600px) {
		#musicInfo {
			font-size: 1em;
		}
		#songArtist {
			font-size: .9em;
		}
		#musicInfo {
			bottom: 25px;
		}
		#seekBar {
			height: 3px;
		}
	}
</style>
