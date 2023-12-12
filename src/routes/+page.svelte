<script>
// @ts-nocheck

    import Homepage from "../pages/Homepage.svelte";
    import { activeRouteDerived, setActiveRoute } from '../activeRoute';
    import { onMount } from 'svelte';

    let activeRoute = '';

    activeRouteDerived.subscribe(value => {
        activeRoute = value;
    });

    onMount(() => {
        setActiveRoute('/');
    });
</script>

<section>
	<div id="searchText">- Search for a song, album or artist</div>
    <Homepage />
</section>

<style>
	section {
        min-height: 100vh;
        overflow-x: hidden;
        background: #050505;
        color:#fff;
        z-index: 0;
        padding-left: 10vw;
		background-image: linear-gradient(to bottom, #11052c, #050505, #050505, #050505, #050505);
	}
	#searchText {
        opacity: .4;
		font-size: 1rem;
        position: absolute;
        top: 35px;
        left: 770px;
	}
</style>
