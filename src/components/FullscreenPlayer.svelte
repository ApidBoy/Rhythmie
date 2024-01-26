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
	import { playerData, converter, limitString } from '../store';
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

<section id="playerContainer">

    {#if songDetails.length !== 0}
    <div id="songData">
        <div id="songArtContainer">
            <img src={songDetails.data[0].image[2].link} draggable={false} id="songArt" alt="Music art" />
        </div>
        <div id="songInfo">
            <div id="songName">{limitString(songDetails.data[0].name, 20)}</div>
            <div id="songArtist">• {songDetails.data[0].primaryArtists}</div>
        </div>
    </div>
    {:else}

        <PlayerSkeleton />

    {/if}
    <div id="lyricsContainer">
        <div id="songLyrics">
            <div id="lyricsTitle">
                Lyrics
            </div>
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
        margin-top: .7em;
        margin-left: .1em;
        border-radius: 2rem;
		color: #8f49ff;
        font-family: 'Josefin Sans', sans-serif;
        font-size: 2rem;
        width: 35vw;
    }
    #songControls {
        height: 30%;
        width: 72%;
        position: relative;
        left: 440px;
        bottom: 120px;
        display: none;
        /* background: #333; */
    }
	#totalSeek {
		width: 100%;
		height: 5px;
		z-index: 2;
		transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
	}
    #totalSeek > div {
		font-family: 'Montserrat', sans-serif;
        font-size: .9rem;
		width: 4rem;
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
    #musicComponent {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 2em;
    }
    #playPause {
        width: 32px;
        margin: 5px 2px;
    }
    #playPause:hover {
        transform: scale(1.08);
        cursor: pointer;
    }
    #nextButton,
    #prevButton {
        transition: 0.4s;
        width: 24px;
        margin: 0 20px;
    }
    #repeatButton,
    #shuffleButton {
        width: 20px;
        margin: 0 0px;
    }
    #songLyrics {
        min-height: 500px;
        min-width: 400px;
        max-height: 500px;
        max-width: 400px;
        background: #1717177a;
        margin: 10px;
        border-radius: 20px;
        position: absolute;
        right: 5vw;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        backdrop-filter: blur(10px);
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
        background: #272727;
        margin-bottom: 20px;
        border-radius: 5px;
        margin-left: 5%;
    }


    
	@media only screen and (max-width: 970px) {
        #playerContainer {
            flex-direction: column;
            height: 168vh;
            align-items: center;
            margin-left: -7vw;
        }
        #songArtContainer {
            min-height: 20em;
            min-width: 20em;
            max-height: 20em;
            max-width: 20em;
            overflow: hidden;
            z-index: 0;
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
            height: 100vh;
        }
        #songInfo {
            margin-left: 0;
        }
        #songName {
            height: 12%;
            width: 100%;
            /* background: #fff; */
            border-radius: 2rem;
            margin-top: 8%;
            margin-bottom: 1%;
            font-family: 'Josefin Sans', sans-serif;
            font-size: 2rem;
        }
        #songArtist {
            margin-top: .7em;
            margin-left: .1em;
            border-radius: 2rem;
            color: #8f49ff;
            font-family: 'Josefin Sans', sans-serif;
            font-size: 1.2rem;
            width: 35vw;
        }
        #lyricsContainer {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 10vw;
        }
        #songLyrics {
            min-height: 50vh;
            min-width: 90vw;
            max-height: 50vh;
            max-width: 90vw;
        }
        #lyricsTitle {
            font-family: 'Josefin Sans', sans-serif;
            font-size: 1.4rem;
            margin: 20px 0;
            margin-left: 5%;
        }
    }


</style>