<script>
	// @ts-nocheck
	import HomepageCards from '../components/homepageComponents/HomepageCards.svelte';
	import edit from '$lib/res/pencil.png';
	import play from '$lib/res/play-button.png';
	import heart from '$lib/res/heart.png';
	import defaultImg from '$lib/res/default.png';
	import { onMount } from 'svelte';
	import { limitString, resultsStore, fetchSong } from '../store.js';
	import HomepageCardsSkeleton from '../components/skeletons/homepage/HomepageCardsSkeleton.svelte';

	let greeting = 'Hey There!';
	let results = undefined;
	let mostRecentSong = [];

	resultsStore.set(results);
	let index = 0;

	const initGreeting = () => {
		const date = new Date();
		if (date.getHours() >= 6 && date.getHours() <= 12) {
			greeting = 'Good morning!';
		} else if (date.getHours() >= 12 && date.getHours() <= 16) {
			greeting = 'Good afternoon!';
		} else if (date.getHours() >= 16 && date.getHours() <= 20) {
			greeting = 'Good evening!';
		} else if (date.getHours() >= 20 && date.getHours() <= 24) {
			greeting = 'Sweet dreams!';
		} else if (date.getHours() >= 0 && date.getHours() <= 6) {
			greeting = 'Sweet dreams!';
		}
	};

	const fetchHomepageData = async () => {
		try {
			let url = 'https://saavn.me/modules?language=hindi,english';
			let homeData = await fetch(url);
			let parsedData = await homeData.json();
			resultsStore.set(parsedData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	onMount(() => {
		initGreeting();
		fetchHomepageData();
		resultsStore.subscribe((value) => {
			results = value;
		});
		if (localStorage.getItem('mostRecentSong')) {
			mostRecentSong = JSON.parse(localStorage.getItem('mostRecentSong'));
			document.getElementById('lastPlayedContainer').style.background = `url(${mostRecentSong.image[2].link})`;
			document.getElementById('lastPlayedContainer').style.backgroundRepeat = 'no-repeat';
			document.getElementById('lastPlayedContainer').style.backgroundSize = 'cover';
			document.getElementById('lastPlayedContainer').style.backgroundPosition = 'center';
		}
	});
</script>

<section id="homePage">
	<div id="content">
		<div id="greeting">
			{greeting}
			{#if greeting.includes('Hey')}
				<img id="handWaveEmoji" src="https://c.tenor.com/Wx9IEmZZXSoAAAAi/hi.gif" alt="" />
			{/if}
			{#if greeting.includes('dreams')}
				<img
					id="handWaveEmoji"
					src="https://c.tenor.com/wNzoikuVQDUAAAAi/sleeping-face-joypixels.gif"
					alt=""
				/>
			{/if}
			{#if greeting.includes('morning')}
				<img
					style="marginLeft: '-3px'"
					id="handWaveEmoji"
					src="https://c.tenor.com/0l3zCp-KLX4AAAAi/pictia-nft.gif"
					alt=""
				/>
			{/if}
			{#if greeting.includes('afternoon')}
				<img
					style="marginLeft: '-3px'"
					id="handWaveEmoji"
					src="https://c.tenor.com/0l3zCp-KLX4AAAAi/pictia-nft.gif"
					alt=""
				/>
			{/if}
			{#if greeting.includes('evening')}
				<img
					style="marginLeft: '-5px'"
					id="handWaveEmoji"
					src="https://c.tenor.com/fK_mqBr8xGIAAAAi/coffee-lover.gif"
					alt=""
				/>
			{/if}
			<div id="username">
				<div id="usernameField">Enter your name</div>
				<input placeholder="Enter your name" type="text" id="usernameInput" />
				<img alt="Edit" id="editUsername" src={edit} />
			</div>
		</div>
		<div id="lastPlayedSectionTitle">Pick up where you left off</div>
		<div id="secondaryHomeSection">
			<div id="lastPlayedContainer">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div id="lastPlayed">
					<div id="lastPlayedArt">
						{#if mostRecentSong.length !== 0}
							<img alt="Music art" src={mostRecentSong.image[1].link} />
						{:else}
							<img alt="Music art" src={defaultImg} />
						{/if}
					</div>
					<div id="lastPlayedDetails">
						<div id="lastPlayedTitle">
							{#if mostRecentSong.length !== 0}
								{limitString(mostRecentSong.name, 22)}
							{:else}
								Play something...
							{/if}
						</div>
						<div id="lastPlayedArtist">
							{#if mostRecentSong.length !== 0}
								{limitString(mostRecentSong.primaryArtists, 26)}
							{:else}
								Nya! Nya! Nya!
							{/if}
						</div>
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div on:click={() => fetchSong(mostRecentSong.id)} id="playButtonContainer">
						<img alt="Play" id="playButton" src={play} />
					</div>
				</div>
			</div>
			<div id="likedSongsContainer">
				<div id="likedSongs">
					<div id="likedSongsArt">
						<img alt="Favorite" id="heartIcon" src={heart} />
					</div>
					<div id="likedSongsDetails">
						<div id="likedSongsTitle">Your liked songs</div>
						<div id="likedSongsNumber">0 Songs</div>
					</div>
					<div id="playButtonContainer">
						<img alt="Play" id="playButton" src={play} />
					</div>
				</div>
			</div>
		</div>
		<div id="homePageTitleContainer">
			<div id="homePageTitle">
				Trending now <img
					id="fireEmoji"
					src="https://c.tenor.com/8McIGu0Tf_QAAAAi/fire-joypixels.gif"
					alt=""
				/>
			</div>
		</div>
		<div id="homeCardContainer">
			<HomepageCards />
		</div>
		<div id="homeSeparatorContainer">
			<div id="homeSeparator"></div>
		</div>
	</div>
</section>

<style>
	#homePage {
		overflow: scroll;
		overflow-x: hidden;
		z-index: 3;
		margin-left: 250px;
	}
	#content {
		margin-top: 12vh;
		margin-left: 2vw;
	}
	#greeting {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 28px;
		margin-bottom: 40px;
	}
	#username {
		margin-top: 17px;
		display: flex;
		align-items: center;
	}
	#usernameField,
	#usernameInput {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 60px;
		color: transparent;
		-webkit-text-stroke: 1px #fff;
	}
	#usernameInput {
		background: transparent;
		border: none;
		border-bottom: 1px solid #6f16ff;
		caret-color: #fff;
		display: none;
	}
	#usernameInput::placeholder {
		color: transparent;
		-webkit-text-stroke: 1px #aaa;
	}
	#editUsername {
		margin-left: 15px;
		opacity: 0;
	}
	#lastPlayedSectionTitle {
		font-size: 18px;
		margin-left: 5px;
		font-family: 'Josefin Sans', sans-serif;
	}
	#lastPlayedContainer, #likedSongsContainer {
		height: 100%;
		width: 100%;
		border-top-left-radius: 400px;
		border-bottom-left-radius: 400px;
		margin-top: 20px;
		margin-right: 5px;
		overflow: hidden;
		border: 1px solid #444;
		background: url("https://miro.medium.com/v2/resize:fit:952/1*fpgvaFnX1cYA0VBs6Cz1Lg.gif");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
	#likedSongsContainer {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: 400px;
		border-bottom-right-radius: 400px;
		background: url("https://w0.peakpx.com/wallpaper/395/439/HD-wallpaper-purple-heart-galaxy-galaxy-hearts-purple-thumbnail.jpg");
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
	}
	#lastPlayed, #likedSongs {
		height: 100%;
		width: 100%;
		backdrop-filter: blur(7px) contrast(130%) brightness(28%);
		/* margin: 20px; */
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 5px;
	}
	/* #likedSongsButtonContainer {
		height: 80%;
		width: 100%;
		border-top-left-radius: 400px;
		border-bottom-left-radius: 400px;
		margin-top: 20px;
		margin-right: 5px;
		overflow: hidden;
		border: 1px solid #444;
		background: url("https://w0.peakpx.com/wallpaper/395/439/HD-wallpaper-purple-heart-galaxy-galaxy-hearts-purple-thumbnail.jpg");
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
		margin-top: 39px;
		border-top-right-radius: 400px;
		border-bottom-right-radius: 400px;
		border: 1px solid #444;
		height: 100%;
		width: 100%;
		height: 140px;
		width: 620px;
	} */
	#likedSongs {
		backdrop-filter: blur(7px) contrast(130%) brightness(70%);
	}

	#secondaryHomeSection {
		display: inline-flex;
		margin-bottom: 20px;
	}
	#playButtonContainer {
		position: relative;
		right: 25px;
	}

	#lastPlayedArt, #likedSongsArt {
		margin: 7px 14px;
	}

	#lastPlayedArt > img {
		width: 115px;
		border-radius: 300px;
		background: #0a0a0a;
	}
	#lastPlayedDetails,
	#likedSongsDetails {
		width: 405px;
		/*background: #6f16ff;*/
	}
	#lastPlayedTitle,
	#likedSongsTitle {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 25px;
		margin-bottom: 7px;
		text-shadow: 0 0 12px #000;
	}
	#lastPlayedArtist,
	#likedSongsNumber {
		font-family: 'Josefin Sans', sans-serif;
		color: #7d2cff;
		font-size: 18px;
		text-shadow: 0 0 12px #000;
	}
	#homeCardContainer {
		display: grid;
		gap: 2vw;
		/* grid-template-columns: 200px 200px 200px 200px 200px 200px 200px;
		grid-template-rows: 250px 250px 250px; */
		/* grid-template-columns: auto auto auto auto auto auto auto;
		grid-template-rows: auto auto auto; */
		/* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr; */
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: 1fr 1fr 1fr .1fr;
		/* margin-right: 20px; */
		width: 92%;
	}
	#likedSongs {
		display: flex;
		align-items: center;
	}
	#heartIcon {
		background: #0a0a0a;
		padding: 25px;
		border-radius: 300px;
		width: 65px;
	}
	#homePageTitleContainer {
		font-size: 25px;
		display: flex;
		margin: 20px 5px;
	}
	#homePageTitle {
		font-family: 'Josefin Sans', sans-serif;
		padding-bottom: 10px;
		width: 200px;
	}
	#homeSeparatorContainer {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 30px;
	}
	#homeSeparator {
		width: 130px;
		height: 5px;
		background: #ddd;
		border-radius: 20px;
		margin-top: 25px;
		margin-bottom: 30px;
	}

	#fireEmoji {
		height: 25px;
	}
	#handWaveEmoji {
		height: 30px;
		padding-left: 8px;
		/*display: none;*/
	}

	@media (hover:hover) {
	
		#editUsername:hover {
			cursor: pointer;
			transform: scale(1.1);
		}
		#username:hover > #editUsername {
			opacity: 1;
		}

		#lastPlayedContainer:hover {
			/* backdrop-filter: blur(0) contrast(130%) brightness(20%); */
			/* transform: scale(1.03); */
			border-radius: 400px;
			margin-right: 40px;
			cursor: pointer;
			box-shadow: 0 0 20px #331368;
		}
		#likedSongsContainer:hover {
			/* backdrop-filter: blur(4px) contrast(130%) brightness(20%); */
			/* transform: scale(1.03); */
			border-radius: 400px;
			margin-left: 40px;
			cursor: pointer;
			box-shadow: 0 0 20px #331368;
		}

	}

	@media only screen and (max-width: 1800px) {
		#homeCardContainer {
			grid-template-columns: repeat(6, 1fr);
			grid-template-rows: 1fr 1fr 1fr 1fr .1fr;
		}
	}

	@media only screen and (max-width: 1560px) {
		#homeCardContainer {
			grid-template-columns: repeat(5, 1fr);
			grid-template-rows: 1fr 1fr 1fr 1fr 1fr .1fr;
		}
	}

	@media only screen and (max-width: 1480px) {
		#secondaryHomeSection {
			flex-direction: column;
			width: 91%;
		}
		#lastPlayedContainer {
			border-top-left-radius: 32px;
			border-top-right-radius: 32px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		#likedSongsContainer {
			margin-top: 10px;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			border-bottom-left-radius: 32px;
			border-bottom-right-radius: 32px;
		}
		#lastPlayed, #likedSongs {
			justify-content: flex-start;
		}
		#playButtonContainer {
			position: absolute;
			right: 40px;
		}
	}

	@media only screen and (max-width: 1300px) {
		#homeCardContainer {
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr .1fr;
		}
	}

	@media only screen and (max-width: 970px) {
		#content {
			margin-top: 9vh;
		}
		#homePage {
			margin-left: 9vw;
			/* width: 100vw; */
		}
	}

	@media only screen and (max-width: 840px) {
		#homeCardContainer {
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr .1fr;
		}
		#lastPlayedArt > img {
			width: 70px;
		}
		#heartIcon {
			width: 40px;
			padding: 12px;
			border: 1px solid #444;
		}
		#lastPlayedContainer {
			margin-bottom: -8px;
		}
		#homePageTitleContainer {
			margin-top: 10px;
			font-size: 1.2em;
		}
		#fireEmoji {
			height: 20px;
		}
		#handWaveEmoji {
			padding-left: 0;
		}
	}
	@media only screen and (max-width: 580px) {
		#homeCardContainer {
			margin-left: 2vw;
			gap: 4vw;
			justify-content: center;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr .1fr;
		}
		#lastPlayedTitle, #likedSongsTitle {
			font-size: .9em;
		}
		#lastPlayedArtist, #likedSongsNumber {
			font-size: .8em;
		}
		#playButtonContainer {
			position: relative;
			right: 24px;
		}
		#playButton {
			width: 24px;
		}
		#usernameField,
		#usernameInput {
			font-size: 1.4em;
			-webkit-text-stroke: .5px #fff;
		}
		#greeting {
			font-size: 1.6em;
		}
		#lastPlayedArt > img {
			width: 64px;
			border: 1px solid #444;
		}
	}

	@media only screen and (max-width: 550px) {
		#homePage {
			margin-left: 4vw;
		}
	}
</style>
