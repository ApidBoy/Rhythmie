<script>
	// @ts-nocheck
	import { onDestroy } from 'svelte';
	import { resultsStore, limitString } from '../../store.js';
	import HomepageCardsSkeleton from '../skeletons/homepage/HomepageCardsSkeleton.svelte';
	import moreWhite from '$lib/res/arrow-right.png';
	let results = {};

	const unsubscribe = resultsStore.subscribe((updatedValue) => {
		results = updatedValue;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if results === undefined}
	<HomepageCardsSkeleton />
{:else}
	{#each results.data.albums as element}
		<div class="homeCard">
			<img id="homeCardImg" src={element.image[1].link} alt="Card" />
			<div id="homeCardTitle">{limitString(element.name, 18)}</div>
			{#if element.artists && element.artists[0] && element.artists[0].name !== undefined}
				<div id="homeCardArtist">{limitString(element.artists[0].name, 14)}</div>
			{:else}
				<div id="homeCardArtist">Various Artists</div>
			{/if}
		</div>
	{/each}
	<a href="/explore">
		<div id="moreButton">
			<img id="moreIcon" alt="More" src={moreWhite} />
			<div id="homeCardTitle">Explore more</div>
		</div>
	</a>
{/if}

<style>
	.homeCard {
		height: 227px;
		width: 180px;
		text-align: left;
		background: #171717;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.homeCard:hover {
		cursor: pointer;
		transform: scale(1.04);
		box-shadow: 0 0 15px #353535;
	}
	#homeCardImg {
		height: 150px;
		width: 150px;
		transition: 0.4s;
		border-radius: 10px;
		margin-top: 15px;
	}
	#homeCardTitle {
		font-size: 0.9rem;
		margin-top: 15px;
		width: 80%;
		font-family: 'Josefin Sans', sans-serif;
	}
	#homeCardArtist {
		margin-top: 5px;
		font-size: 0.8rem;
		width: 80%;
		color: #999;
		font-family: 'Josefin Sans', sans-serif;
	}
	#moreIcon {
		width: 30px;
	}
	#moreButton {
		height: 227px;
		width: 135px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 40px;
		border-radius: 20px;
	}

	@media only screen and (max-width: 880px) {
		#homeCardImg,
		.homeCard {
			height: 150px;
			width: 150px;
		}
	}

	@media only screen and (max-width: 750px) {
		#homeCardImg,
		.homeCard {
			height: 110px;
			width: 110px;
		}
		#homeCardTitle {
			font-size: 14px;
		}
	}

	@media only screen and (max-width: 550px) {
		#homeCardTitle {
			margin-top: 5px;
			font-size: 12px;
		}
		#homeCardImg,
		.homeCard {
			height: 90px;
			width: 90px;
			border-radius: 12px;
		}
	}
	@media only screen and (max-width: 440px) {
		#homeCardTitle {
			margin-top: 5px;
			font-size: 13px;
		}
	}
</style>
