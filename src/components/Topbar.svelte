<script>
	import icon from '$lib/res/icon.png';
	import search from '$lib/res/search.png';
	import accountIcon from '$lib/res/account.png';
</script>

<div id="topBar">
	<div id="topbarTextContainer">
		<img id="barIcon" src={icon} alt="Rhythmie icon" />
		<div id="topbarText">Rhythmie</div>
		<div id="barAlpha">In-Dev</div>
		<a href="/explore">
			<img src={search} id="searchIcon" alt="Search" />
		</a>
	</div>
	<div id="searchBar">
		<input placeholder="What's on your mind?" id="searchBox" type="text" />
		<span id="clearBox" class="material-symbols-outlined">close</span>
	</div>
	<div id="userAccountPanel">
		<a href="/mylibrary">
			<img id="accountIcon" alt="Account Icon" src={accountIcon} />
		</a>
	</div>
</div>

<style>
	#topBar {
		z-index: 3;
		position: fixed;
		top: 0px;
		right: 0;
		width: 100%;
		height: 63px;
		z-index: 3;
		background: transparent;
		padding-top: 10px;
	}
	#searchBar {
		margin-left: 15%;
	}
	#searchBox {
		padding: 7px;
		padding-left: 15px;
		height: 30px;
		width: 23.5vw;
		font-size: 17px;
		outline: none;
		border-radius: 15px;
		border: none;
		background: #222;
		margin-top: 15px;
		caret-color: #6f16ff;
		filter: drop-shadow(0 0 20px #000);
	}
	#searchBox:focus {
		box-shadow: 0 0 15px #383344;
	}
	#userAccountPanel {
		position: absolute;
		top: 20px;
		right: 30px;
	}
    #accountIcon {
        width: 32px;
    }
	#accountIcon:hover {
		transform: scale(1.1);
	}
	#clearBox {
		position: relative;
		top: 5px;
		right: 35px;
		font-size: 22px;
		visibility: hidden;
		padding: 3px;
		border-radius: 30px;
	}
	#clearBox:hover {
		cursor: pointer;
	}

	#topbarTextContainer {
		display: none;
		margin-left: 130px;
	}
	#topBar {
		font-size: 26px;
		margin-left: 10px;
	}
	#barAlpha {
		color: #8d3eff;
		font-size: 12px;
		border: 1px solid;
		padding: 6px;
		margin-left: 10px;
		border-radius: 20px;
	}
	#searchIcon {
		display: none;
		position: absolute;
		right: 10px;
		width: 35px;
	}
	#barIcon {
		width: 40px;
		display: none;
	}
</style>
