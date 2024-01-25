<script>
// @ts-nocheck

    import Topbar from "../components/Topbar.svelte";
    import Sidebar from "../components/Sidebar.svelte";
	import Player from "../components/Player.svelte";
    import './styles.css';
	import { activeRouteDerived, setActiveRoute } from '../activeRoute';
	import { onMount } from 'svelte';
	import { playerData } from '../store';

	let activeRoute = '';
	let songDetails;
	playerData.subscribe((value) => {
		console.log('Player data: ', value);
		songDetails = value;
    });

    onMount(() => {
        activeRouteDerived.subscribe((value) => {
            activeRoute = value;
        });

        activeRouteDerived.subscribe((value) => {
            activeRoute = value;
        });
    });

    
</script>

<Topbar />

{#if !activeRoute.includes("/nowplaying")}
    <Sidebar />
{/if}

{#if songDetails.length !== 0}
    <Player />
{/if}

<main>
    <slot />
</main>