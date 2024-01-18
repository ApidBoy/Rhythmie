<script>
// @ts-nocheck

    import Topbar from "../components/Topbar.svelte";
    import Sidebar from "../components/Sidebar.svelte";
	import Player from "../components/Player.svelte";
    import './styles.css';
	import { activeRouteDerived, setActiveRoute } from '../activeRoute';
	import { onMount } from 'svelte';

	let activeRoute = '';

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

<Player />

<main>
    <slot />
</main>