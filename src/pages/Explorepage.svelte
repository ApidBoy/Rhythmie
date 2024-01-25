<script>
	// @ts-nocheck
	import { searchStore, searchResultStore } from '../store';
	import { goto } from '$app/navigation';

	function debounce(func, delay) {
		let timeoutId;
		return function (...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}
	let searchText = '';

	const debouncedSearch = debounce(() => {
    	goto('/explore/topresults');
		searchStore.set(searchText);
		handleSearch();
		if(searchText === '')
    		goto('/explore');
  	}, 1000);

	const handleInput = (event) => {
    	searchText = event.target.value;
		debouncedSearch();
	}

	const handleSearch = async () => {
		await fetch(`https://saavn.me/search/all?query=${searchText}`)
		.then((response) => response.json())
		.then((data) => {
			searchResultStore.set(data.data);
		});
	}
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
				
				<div id="searchBar">
					<input bind:value={searchText} on:input={handleInput} maxlength="46" placeholder="Search for a song, artist or album" id="searchBox" type="text" />
					<span id="clearBox" class="material-symbols-outlined">close</span>
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
	#searchBar {
		display: none;
	}
	#searchBox {
		padding: 7px;
		padding-left: 15px;
		height: 30px;
		width: 100%;
		font-size: 17px;
		outline: none;
		border-radius: 15px;
		margin-top: 15px;
		caret-color: #6f16ff;
		border: 1px solid #444;
		filter: drop-shadow(0 0 20px #000);
		background: #1717171e;
		/* background: #171717b0; */
		backdrop-filter: blur(14px);
	}
	#searchBox:focus {
		box-shadow: 0 0 15px #000;
	}
	#clearBox {
		display: none;
	}
	#explorePage {
		overflow: scroll;
		overflow-x: hidden;
		z-index: 0;
		margin-left: 250px;
		/* width: 100%; */
	}

	#explorePageContents {
		height: 100%;
		width: 100%;
		margin-top: 8vh;
		margin-left: .6vw;
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
		margin-bottom: 20px;
	}

	#topSearchesIcon {
		padding-top: 15px;
		padding-right: 10px;
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

	@media only screen and (max-width: 1200px) {
		#explorePage {
			margin-left: 160px;
		}
		#explorePageContents {
			margin-left: 6.4vw;
		}
	}
	@media only screen and (max-width: 970px) {
		#explorePage {
			margin: 0;
		}
		#explorePageContents {
			margin-left: 0;
			width: 100%;
		}
		#topSearchesContainer {
			margin-top: 20px;
			/* margin-left: -40px; */
		}
	}
	@media only screen and (max-width: 700px) {
		#topSearchesText {
			font-size: 1.7em;
			margin-bottom: 14px;
		}
		#topSearchesIcon {
			padding-top: 15px;
			height: 25px;
			margin-left: 7px;
		}
		#mostRecentSearch {
			font-size: 1em;
		}
		#mostRecentSearchIcon {
			margin-right: 4px;
			font-size: 20px;
		}
		#shrugEmoji {
			font-size: 2.5rem;
			color: #555;
			margin-bottom: 10px;
		}
		#feelingEmptyText {
			font-family: 'Josefin Sans', sans-serif;
			font-size: 1.2rem;
			color: #555;
		}
		#explorePageContents {
			margin-left: -15px;
		}
	}
	@media only screen and (max-width: 580px) {
		#topSearchesText {
			margin-left: 4px;
		}
		#searchBar {
			display: block;
			margin-top: -8px;
		}
		#mostRecentSearch {
			margin-top: 20px;
			font-size: 1em;
		}
		#mostRecentSearchIcon {
			margin-left: 1px;
			margin-right: 4px;
			font-size: 20px;
		}
	}
	@media only screen and (max-width: 500px) {
		#topSearchesText {
			font-size: 1.3em;
			margin-bottom: 14px;
		}
		#topSearchesIcon {
			padding-top: 15px;
			height: 20px;
			margin-left: 7px;
		}
	}
	@media only screen and (max-width: 390px) {
		#topSearchesText {
			font-size: 1.2em;
		}
		#topSearchesIcon {
			height: 18px;
			margin-left: 4px;
		}
		#mostRecentSearch {
			margin-top: 18px;
			font-size: .9em;
		}
		#mostRecentSearchIcon {
			font-size: 18px;
		}
	}
</style>
