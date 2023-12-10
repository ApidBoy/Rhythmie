<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import TopSearches from '../components/explorepageComponents/TopSearches.svelte';
	import { topSearchesStore } from '../store';
</script>

<section id="explorePage">
	<div id="explorePageContents">
		<div id="results">
			<div id="topSearchesContainer">
				<div id="topSearchesText">
					What's on your mind lately?
					<img
						id="topSearchesIcon"
						src="https://c.tenor.com/S8dOItPNscgAAAAi/loop-loading.gif"
						alt=""
					/>
				</div>

				<a href="/explore/topresults" id="mostRecentSearch">
					<span id="mostRecentSearchIcon" class="material-symbols-outlined"> history </span>
					<div>No recent searches so far</div>
				</a>
				<div id="feelingEmpty">
					<div id="shrugEmoji">¯\_(ツ)_/¯</div>
					<div id="feelingEmptyText">It feels so empty here</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	#explorePage {
		overflow: scroll;
		overflow-x: hidden;
		z-index: 0;
	}

	#explorePageContents {
		height: 100%;
		width: 100%;
		margin-top: 8vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#topSearchesContainer {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: center;
		width: 80vw;
	}

	#topSearchesText {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 35px;
		padding-bottom: 20px;
	}

	#topSearchesIcon {
		padding-top: 15px;
		padding-right: 10px;
	}

	#topSearchesIcon {
		height: 35px;
		margin-left: 10px;
	}

	#mostRecentSearch {
		font-size: 16px;
		opacity: 0.4;
		display: flex;
		margin-bottom: 10px;
		align-items: center;
	}

	#mostRecentSearchIcon {
		margin-right: 5px;
	}

	#feelingEmpty {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 50vh;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	#shrugEmoji {
		font-size: 4rem;
		color: #555;
		margin-bottom: 10px;
	}
	#feelingEmptyText {
		font-family: 'Josefin Sans', sans-serif;
		font-size: 1.8rem;
		color: #555;
	}
</style>
