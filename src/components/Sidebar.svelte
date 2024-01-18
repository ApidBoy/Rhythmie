<script>
// @ts-nocheck

	import icon from '$lib/res/icon.png';
	import home from '$lib/res/home.png';
	import explore from '$lib/res/explore.png';
	import library from '$lib/res/library.png';
	import { activeRouteDerived, setActiveRoute } from '../activeRoute';

	let activeRoute = '';

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	const handleNavigation = (route) => {
		setActiveRoute(route);
	};

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
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
	<div id="playQueue">
		<div id="playQueueTitle">Your Queue</div>
		<!-- {props.queue.songName !== undefined &&
        <div id="queueContainer">
            <div id="queueItem">
                <div id="queueItemArtContainer">
                    <object id="queueItemArt" data={props.queue.songArt} type="image/png">
                        <img id="queueItemArt" src={defaultImg} onError={defaultImg}  alt={''}/>
                    </object>
                </div>
                <div id="queueItemInfo">
                    <div id="queueItemTitle">{props.queue.songName}</div>
                    <div id="queueItemArtist">{props.queue.songArtist}</div>
                </div>
                <div id="nowPlayingIconContainer">
                    <img src={nowPlayingIcon} id="nowPlayingIcon"/>
                </div>
            </div>
            <div id="clearQueue">
                <div id="clearQueueButton">
                    Clear queue
                </div>
            </div>
        </div>
        }
        {props.queue.songName === undefined &&
        <div id="emptyQueue">
            <div id="createQueueButton">
                Create a queue
            </div>
        </div>
        } -->
	</div>
</nav>

<style>
	#sideNav {
		display: flex;
		flex-direction: column;
		z-index: 3;
		width: 245px;
		height: 70vh;
		padding: 10px;
		overflow: hidden;
		position: fixed;
		top: 64px;
		left: 0;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
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
	nav > hr {
		margin-top: 20px;
		margin-bottom: 10px;
	}
	#playQueueTitle {
		font-size: 17px;
		margin-top: 20px;
		margin-left: 10px;
		display: none;
	}

	#emptyQueue {
		display: flex;
		flex-direction: column;
	}

	#createQueueButton {
		font-size: 17px;
		margin: 17px 10px;
		color: #999;
	}

	#clearQueueButton {
		font-size: 15px;
		margin: 15px 80px;
		color: #999;
	}

	#queueContainer {
		margin-top: 20px;
	}

	#queueItem {
		display: flex;
		background: #222;
		align-items: center;
		height: 50px;
		border-radius: 20px;
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
		font-size: 15px;
		margin-bottom: 2px;
	}
	#queueItemArtist {
		font-size: 12px;
		color: #999;
	}
	#queueItemInfo {
		display: flex;
		flex-direction: column;
		margin-left: 10px;
		width: 154px;
	}

	#nowPlayingIcon {
		width: 20px;
		animation-name: spinningDisc;
		animation-duration: 0.8s;
		animation-iteration-count: infinite;
	}


	/* @keyframes spinningDisc {
  from {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(180deg);
  }
  to {
    transform: rotateZ(360deg);
  }
} */
	@keyframes spinningDisc {
		from {
			transform: scale(1);
		}
		50% {
			transform: scale(1.14);
		}
		to {
			transform: scale(1);
		}
	}

	@media only screen and (max-width: 1400px) {
		#sideNav {
			width: 35px;
			display: flex;
			align-items: center;
		}
		#barTitleText {
			display: none;
		}
		#alpha {
			display: none;
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
		.navMenuItem {
			margin-left: 10px;
			padding-bottom: 5px;
			margin-bottom: 10px;
		}
	}

	@media only screen and (max-width: 750px) {
		#sideNav {
			display: none;
		}
	}
</style>
