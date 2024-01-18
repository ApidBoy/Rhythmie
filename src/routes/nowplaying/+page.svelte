<script>
	// @ts-nocheck

	import { activeRouteDerived, setActiveRoute } from '../../activeRoute';
	import { onMount } from 'svelte';
	import FullscreenPlayer from '../../components/FullscreenPlayer.svelte';
	import { playerData, converter, limitString } from '../../store';

	let activeRoute = '';
	let songDetails;

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	playerData.subscribe((value) => {
		console.log("Player data: ", value);
		songDetails = value;
	});

	onMount(() => {
		setActiveRoute('/nowplaying');
		document.querySelector("section").style.background=`url(${songDetails.data[0].image[2].link})`;
		document.querySelector("section").style.backgroundRepeat="no-repeat";
		document.querySelector("section").style.backgroundSize="cover";
		document.querySelector("section").style.backgroundPosition="center";
    });
</script>

<section>
	<div>
		<FullscreenPlayer />
	</div>
</section>

<style>
	section {
        overflow-x: hidden;
        background: #050505;
        color:#fff;
        z-index: 0;
	}
	div {
		min-height: 100vh;
		backdrop-filter: blur(17px) brightness(35%);
        padding-left: 7vw;
	}
</style>
