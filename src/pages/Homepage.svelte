<script>
    // @ts-nocheck
    import HomepageCards from '../components/homepageComponents/HomepageCards.svelte';
    import edit from '$lib/res/pencil.png';
    import play from '$lib/res/play-button.png';
    import heart from '$lib/res/heart.png';
    import art from '$lib/res/default.png';
    import { onMount } from 'svelte';
    import { resultsStore } from '../store.js';
	import HomepageCardsSkeleton from '../components/skeletons/homepage/HomepageCardsSkeleton.svelte';

    let greeting = 'Hey There!';
    let results = undefined;
    
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
            let url = "https://saavn.me/modules?language=hindi,english";
            let homeData = await fetch(url);
            let parsedData = await homeData.json();
            resultsStore.set(parsedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    onMount(() => {
        initGreeting();
        fetchHomepageData();
        resultsStore.subscribe(value => {
            results = value;
        });
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
		<div id="secondaryHomeSection">
			<div id="lastPlayedContainer">
				<div id="lastPlayedSectionTitle">Pick up where you left off</div>
				<div id="lastPlayed">
					<div id="lastPlayedArt">
						<img alt="Music art" src={art} />
					</div>
					<div id="lastPlayedDetails">
						<div id="lastPlayedTitle">Play something awesome!</div>
						<div id="lastPlayedArtist">Your last played song will stay here.</div>
					</div>
					<div id="playButtonEffectContainer">
						<img alt="Play" id="playButtonEffect" src={play} />
					</div>
				</div>
			</div>
			<div id="likedSongsButtonContainer">
				<div id="likedSongs">
					<div id="likedSongsHeart">
						<img alt="Favorite" id="heartIcon" src={heart} />
					</div>
					<div id="likedSongsDetails">
						<div id="likedSongsTitle">Your liked songs</div>
						<div id="likedSongsNumber">0 Songs</div>
					</div>
					<div id="playButtonEffectContainer">
						<img alt="Play" id="playButtonEffect" src={play} />
					</div>
				</div>
			</div>
		</div>
		<div id="homePageTitleContainer">
			<div id="homePageTitle">
				Most Popular <img
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
		display: flex;
		justify-content: center;
	}
	#content {
		margin-top: 12vh;
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
	#username:hover > #editUsername {
		opacity: 1;
	}
	#editUsername {
		margin-left: 15px;
		opacity: 0;
	}
	#editUsername:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
	#lastPlayed {
		height: 140px;
		width: 620px;
		border-radius: 40px;
		margin-top: 20px;
		margin-right: 20px;
		background: #171717;
	}
	#lastPlayedSectionTitle {
		font-size: 18px;
		margin-left: 5px;
		font-family: 'Josefin Sans', sans-serif;
	}
	#likedSongs {
		height: 150px;
		width: 620px;
		border-radius: 40px;
		margin-top: 40px;
		margin-right: 20px;
		background: #171717;
	}

	#secondaryHomeSection {
		display: inline-flex;
		margin-bottom: 20px;
	}
	#lastPlayed {
		display: flex;
		align-items: center;
		padding-top: 5px;
	}

	#lastPlayed:hover,
	#likedSongs:hover {
		transform: scale(1.02);
		box-shadow: 0 0 10px #222;
		cursor: pointer;
	}

	#playButtonEffectContainer {
		position: relative;
	}

	#lastPlayedArt > img {
		width: 115px;
		border-radius: 30px;
		margin-left: 20px;
		background: #0a0a0a;
	}
	#lastPlayedDetails,
	#likedSongsDetails {
		margin-left: 20px;
		width: 405px;
		/*background: #6f16ff;*/
	}
	#lastPlayedTitle,
	#likedSongsTitle {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 25px;
		margin-bottom: 7px;
	}
	#lastPlayedArtist,
	#likedSongsNumber {
		font-family: 'Josefin Sans', sans-serif;
		color: #6f16ff;
		font-size: 18px;
	}
	#homeCardContainer {
		display: grid;
		gap: 20px;
		grid-template-columns: 200px 200px 200px 200px 200px 200px 200px;
		grid-template-rows: 250px 250px 250px;
	}
	#likedSongs {
		display: flex;
		align-items: center;
	}
	#heartIcon {
		margin-left: 20px;
		background: #0a0a0a;
		padding: 25px;
		border-radius: 30px;
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
	#exploreMoreHomeContainer {
		font-size: 22px;
		text-align: center;
		display: flex;
		justify-content: center;
		padding-bottom: 40px;
	}
	#exploreMoreHome {
		padding-top: 10px;
		width: 400px;
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
	#exploreMoreHome:hover {
		color: #8d3eff;
	}
	@media only screen and (max-width: 1740px) {
		#homePage {
			margin-top: 30px;
			width: 86%;
			margin-left: 14vw;
		}
		#homeCardContainer {
			grid-template-columns: 250px 250px 250px 250px;
			grid-template-rows: 280px 280px 280px 280px 280px;
		}
	}
	@media only screen and (max-width: 1500px) {
		#homeCardContainer {
			grid-template-columns: 250px 250px 250px;
			grid-template-rows: 280px 280px 280px 280px 280px 280px 280px;
		}
	}
	@media only screen and (max-width: 1400px) {
		#homePage {
			width: 92%;
			margin-left: 110px;
		}
		#homeCardContainer {
			grid-template-columns: 250px 250px 250px 250px;
			grid-template-rows: 280px 280px 280px 280px 280px;
		}
	}
	@media only screen and (max-width: 1170px) {
		#homePage {
			width: 92%;
			margin-left: 110px;
		}
		#homeCardContainer {
			grid-template-columns: 250px 250px 250px;
			grid-template-rows: 280px 280px 280px 280px 280px;
		}
	}
	@media only screen and (max-width: 880px) {
		#greeting {
			text-align: center;
			font-weight: bold;
		}
		#homePage {
			width: 92%;
			margin-left: 70px;
		}
		#homeCardContainer {
			grid-template-columns: 200px 200px 200px;
			grid-template-rows: 200px 200px 200px 200px 200px;
		}
	}

	@media only screen and (max-width: 750px) {
		#homePage {
			margin-left: 0;
			width: 100%;
		}
		#exploreMoreHome {
			margin-bottom: 35px;
		}
		#homePageTitle {
			font-size: 16px;
			width: 140px;
		}
		#homeCardContainer {
			grid-template-columns: 170px 170px 170px;
			grid-template-rows: 200px 200px 200px 200px 200px;
			margin-left: 20px;
		}
	}

	@media only screen and (max-width: 550px) {
		#greeting {
			font-size: 30px;
		}
		#homeCardContainer {
			grid-template-columns: 100px 100px 100px;
			grid-template-rows: 125px 125px 125px 125px 125px;
			margin-left: 30px;
		}
		#exploreMoreHomeContainer {
			padding-bottom: 100px;
		}
	}
</style>
