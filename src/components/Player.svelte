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
	import { playerData, converter } from '../store';
	import PlayerSkeleton from './skeletons/PlayerSkeleton.svelte';
	import { onMount } from 'svelte';

	let songDetails;
	let audio;
	let seekbar;
	let playButton;
	let currentDuration = '00:00';
	let playState = true;
	let playPauseIcon = play;

	playerData.subscribe((value) => {
		console.log("Player data: ", value);
		songDetails = value;
		setTimeout(() => {
			if(songDetails.length !== 0) {
				localStorage.setItem('mostRecentSong', JSON.stringify(songDetails.data[0]));
				playPause();
			}
		}, 1000);
	});

	let interval = () => setInterval(() => {
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
	}
	const playPause = () => {
		if(playState) {
			audio.play();
			interval();
			playState = false;
			playPauseIcon = pause;
			playButton.style.margin = "5px 2px";
		} else {
			audio.pause();
			playState = true;
			playPauseIcon = play;
			playButton.style.margin = "5px 10px";
		}
	}

</script>


{#if songDetails.length !== 0}

<div id="bottomBar">
<audio bind:this={audio} src={songDetails.data[0].downloadUrl[2].link}></audio>
	<div id="musicInfo">
		<img src={songDetails.data[0].image[1].link} draggable={false} id="songArt" alt="Music art" />
		<div id="songInfo">
			<div id="songTitle">
				<span>{songDetails.data[0].name}</span>
				<div id="songArtist">{songDetails.data[0].primaryArtists}</div>
			</div>
		</div>
	</div>
    <div id="musicControls">
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <div id="musicComponent">
        <img draggable={false} id="shuffleButton" src={shuffle} alt="Shuffle" />
        <img
          draggable={false}
          id="prevButton"
          src={prev}
          alt="Previous"
        />
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
		<input bind:this={seekbar} on:input={updateSeek} id="seekBar" type="range" min="0" max={songDetails.data[0].duration} step="1" value="0" />
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
		background: #0a0a0a;
		box-shadow: 0 0 20px #000;
		border-top-left-radius: 30px;
		border-top-right-radius: 30px;
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
	#songArt {
		height: 70px;
		width: 70px;
        background: #000;
		z-index: 5;
		border-radius: .8rem;
		position: absolute;
		left: 20px;
        bottom: -12px;
	}
	#songArt:hover {
		cursor: pointer;
		border-radius: 6px;
		transform: scale(1.05);
		margin-top: -90px;
	}
	#songInfo {
		position: relative;
		left: 110px;
		width: 100%;
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
        font-size: .8rem;
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
		position: fixed;
		bottom: 35px;
		right: 8.8%;
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
		bottom: 4.5%;
		right: 2%;
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
		right: 22%;
	}
	#volumeButton:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	#bottomMenu {
		transition: 0.3s;
		position: relative;
		right: 25%;
	}
	#bottomMenu:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	#favButton {
		transition: 0.3s;
		transform: scale(0.95);
		position: relative;
		right: 28%;
	}
	#favButton:hover {
		cursor: pointer;
		transform: scale(1.05);
	}

</style>
