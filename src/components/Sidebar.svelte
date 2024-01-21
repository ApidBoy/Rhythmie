<script>
// @ts-nocheck

	import icon from '$lib/res/icon.png';
	import home from '$lib/res/home.png';
	import explore from '$lib/res/explore.png';
	import library from '$lib/res/library.png';
	import pauseIcon from '$lib/res/pause-button.png';
	import playIcon from '$lib/res/play-button.png';
	import defaultImg from '$lib/res/default.png';
	import arrowIcon from '$lib/res/down.png';
	import { activeRouteDerived, setActiveRoute } from '../activeRoute';
	import { playerData, limitString } from '../store';
    import { onMount } from 'svelte';

	let activeRoute = '';
	let currentSong = [];
	let queueOpen = false;

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	const handleNavigation = (route) => {
		setActiveRoute(route);
	};

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	const queueStateHandler = () => {
		if (queueOpen) {
			document.getElementById("playQueueContainer").style.height = "60px";
			document.getElementById("expand").style.transform = "rotateZ(180deg)";
			queueOpen = false;
		} else {
			document.getElementById("playQueueContainer").style.height = "auto";
			document.getElementById("expand").style.transform = "rotateZ(0deg)";
			queueOpen = true;
		}
	}


	onMount(() => {
		if (localStorage.getItem('mostRecentSong')) {
			currentSong = JSON.parse(localStorage.getItem('mostRecentSong'));
		}
	});

</script>

<nav id="sideNav">
	<div id="navMenu">
		<a href="/" id="navMenuItem" class:active={activeRoute === '/'} on:click={() => handleNavigation('/')}>
			<div>
				<img id="homeIcon" class="navMenuIcon" src={home} alt="Home icon" />
				<span class="navMenuText"> Home </span>
			</div>
		</a>
		<a href="/explore" id="navMenuItem" class:active={activeRoute.includes('/explore')} on:click={() => handleNavigation('/explore')}>
			<div>
				<img class="navMenuIcon" src={explore} alt="Explore" />
				<span class="navMenuText"> Explore </span>
			</div>
		</a>
		<a href="/mylibrary" id="navMenuItem" class:active={activeRoute.includes('/mylibrary')} on:click={() => handleNavigation('/mylibrary')}>
			<div>
				<img class="navMenuIcon" src={library} alt="Your Library icon" />
				<span class="navMenuText"> My Library </span>
			</div>
		</a>
	</div>
	<div id="playQueueContainer">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div id="playQueue">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="playQueueTitle" on:click={queueStateHandler}>Your Queue
				<img id="expand" src={arrowIcon} alt='' />
			</div>
			<div id="queueContainer">
				<div id="queueItem" class="activeItem">
					<div id="queueItemArtContainer">
						{#if currentSong.length !== 0}
							<object id="queueItemArt" data={currentSong.image[0].link} type="image/png" aria-label="">
								<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
							</object>
						{:else}
							<object id="queueItemArt" data={defaultImg} type="image/png" aria-label="">
								<img id="queueItemArt" src={defaultImg} onError={defaultImg} alt=''/>
							</object>
						{/if}
					</div>
					<div id="queueItemInfo">
						{#if currentSong.length !== 0}
							<div id="queueItemTitle">{limitString(currentSong.name, 16)}</div>
							<div id="queueItemArtist">{limitString(currentSong.primaryArtists, 16)}</div>
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
</nav>

<style>
	#sideNav {
		display: flex;
		flex-direction: column;
		z-index: 3;
		width: 240px;
		padding-left: 10px;
		padding-top: 10px;
		height: 80vh;
		overflow: hidden;
		position: fixed;
		top: 64px;
		left: 0;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		/* background: #fff; */
	}
	#navMenu {
		margin-bottom: 20px;
	}
	#navMenuItem {
		font-size: 1rem;
		margin-top: 10px;
		padding: 10px;
		padding-left: 22px;
		transition: 0.1s;
		display: flex;
		flex-direction: column;
		margin-left: 2px;
		width: 60%;
	}
	.navMenuIcon {
		width: 1.4rem;
		margin-left: 4px;
		margin-top: 4px;
	}
	#homeIcon {
		width: 1.5rem;
	}
	#navMenuItem:hover {
		background: #a5a5a52a;
		cursor: pointer;
		border-radius: 20rem;
	}
	.navMenuText {
		margin-left: 10px;
		position: relative;
		top: -5px;
	}
	.active {
		cursor: pointer;
    	background: rgba(165, 165, 165, 0.164);
		border-radius: 20rem;
		box-shadow: 0 0 12px #111;
	}
	#playQueueContainer {
		background: #171717c4;
		width: 86%;
		border-radius: 20px;
		backdrop-filter: blur(10px);
		overflow: hidden;
		padding-right: 20px;
		border: 1px solid #444;
		filter: drop-shadow(0 0 20px #000);
		background: #1717171e;
		position: absolute;
		bottom: 5px;
		height: 60px;
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
	#playQueueTitle:hover {
		cursor: pointer;
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
	#queueItem:hover {
		background: #222;
		cursor: pointer;
	}
	#queueItem:hover > #playIconContainer > #playIcon {
		opacity: 1;
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

	@media only screen and (max-width: 1400px) {
		#sideNav {
			width: 100%;
			display: flex;
			align-items: center;
			/* margin-right: 20px; */
		}
		.navMenuText {
			display: none;
		}
		#playQueueTitle {
			display: none;
		}
		#createQueueButton {
			display: none;
		}
	}

	@media only screen and (max-width: 750px) {
		#sideNav {
			display: none;
		}
	}
</style>
