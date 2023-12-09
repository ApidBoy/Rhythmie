<script>
	import icon from '$lib/res/icon.png';
	import search from '$lib/res/search.png';
	import accountIcon from '$lib/res/account.png';
</script>

<div id="dialogBox">
	<span id="infoLogo" class="material-symbols-outlined">info</span>
	<span id="dialogText">This is a test message.</span>
</div>
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
		<button id="searchButton"> Search </button>
	</div>
	<div id="userAccountPanel">
		<a href="/mylibrary">
			<img id="accountIcon" alt="Account Icon" src={accountIcon} />
		</a>
	</div>
</div>

<style>
	#dialogBox {
		font-size: 22px;
		position: fixed;
		right: 30px;
		top: 100px;
		background: #333;
		color: #fff;
		border-radius: 10px;
		padding: 10px 20px;
		overflow: hidden;
		display: none;
	}
	#dialogText,
	#infoLogo {
		display: inline;
	}
	#dialogText {
		margin-left: 10px;
	}

	#infoLogo {
		position: relative;
		top: 3px;
		left: -6px;
		font-size: 22px;
		background: #555;
		padding: 10px;
		font-weight: 400;
	}

	#topBar {
		display: flex;
		align-items: center;
		flex-direction: row;
		z-index: 3;
		position: fixed;
		top: 0px;
		right: 0;
		width: 100%;
		height: 63px;
		z-index: 3;
		text-align: center;
		background: transparent;
	}
	#searchBar {
		margin: 12px;
		margin-left: 50%;
	}
	#searchBox {
		padding: 7px;
		padding-left: 15px;
		height: 30px;
		width: 400px;
		font-size: 17px;
		outline: none;
		border-radius: 15px;
		border: none;
		background: #222;
		margin-top: 15px;
		caret-color: #6f16ff;
		filter: drop-shadow(0 0 20px #000);
		/*box-shadow: 0 0 20px #000;*/
	}
	#searchBox:focus {
		box-shadow: 0 0 15px #383344;
	}
	#searchButton {
		display: none;
		margin-left: -20px;
		padding: 9px;
		font-size: 15px;
		font-weight: 600;
		border: 2px solid #5a00eb;
		border-radius: 20px;
		background: #8b42ff;
		color: #fff;
		transition: 0.2s;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	#searchButton:hover {
		cursor: pointer;
		background: #6f16ff;
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
		font-weight: bold;
	}
	#barAlpha {
		color: #8d3eff;
		font-size: 12px;
		border: 1px solid;
		padding: 6px;
		margin-left: 10px;
		font-weight: bold;
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

	@media only screen and (max-width: 2500px) {
		#searchBar {
			margin-left: 49%;
		}
	}
	@media only screen and (max-width: 2400px) {
		#searchBar {
			margin-left: 48%;
		}
	}
	@media only screen and (max-width: 2300px) {
		#searchBar {
			margin-left: 48%;
		}
	}
	@media only screen and (max-width: 2200px) {
		#searchBar {
			margin-left: 47.5%;
		}
	}
	@media only screen and (max-width: 2100px) {
		#searchBar {
			margin-left: 47%;
		}
	}
	@media only screen and (max-width: 2000px) {
		#searchBar {
			margin-left: 47%;
		}
	}
	@media only screen and (max-width: 1900px) {
		#searchBar {
			margin-left: 46%;
		}
	}
	@media only screen and (max-width: 1800px) {
		#searchBar {
			margin-left: 45%;
		}
	}
	@media only screen and (max-width: 1800px) {
		#searchBar {
			margin-left: 44.5%;
		}
	}

	@media only screen and (max-width: 1400px) {
		#topbarTextContainer {
			display: flex;
		}
		#searchBar {
			margin-left: 20px;
		}
	}
	@media only screen and (max-width: 920px) {
		#userAccountPanel {
			display: none;
		}
		#searchBar {
			position: absolute;
			right: 5px;
		}
	}

	@media only screen and (max-width: 900px) {
		#topBar {
			font-size: 22px;
			height: 50px;
		}
		#topbarTextContainer {
			margin-left: 112px;
		}
		#barAlpha {
			font-size: 10px;
		}
		#searchBox {
			font-size: 14px;
			width: 250px;
		}
		#searchButton {
			font-size: 12px;
		}
	}

	@media only screen and (max-width: 750px) {
		#searchBox {
			font-size: 15px;
			width: 200px;
		}
		#topbarTextContainer {
			font-size: 22px;
		}
		#searchBar {
			display: none;
		}
		#searchIcon {
			display: inline-block;
		}
		#topbarText {
			margin-left: 5px;
			margin-top: 5px;
		}
		#topbarTextContainer {
			margin-left: 60px;
		}
		#topBar {
			border-radius: 0;
		}
		#barAlpha {
			font-size: 12px;
			padding-top: 8px;
		}
		#barIcon {
			width: 35px;
			display: block;
		}
	}
</style>
