<script>
	// @ts-nocheck

	import Explorepage from '../../pages/Explorepage.svelte';
	import { activeRouteDerived, setActiveRoute } from '../../activeRoute';
	import { onMount } from 'svelte';

	let activeRoute = '';

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	onMount(() => {
		setActiveRoute('/explore');
	});
</script>

<section>
	<Explorepage />
</section>

<style>
	section {
        min-height: 100vh;
        overflow-x: hidden;
        background: #050505;
        color:#fff;
        z-index: 0;
        padding-left: 10vw;
		background-image: linear-gradient(to bottom, #1f1f1f, #0f0f0f, #090909, #050505, #050505);
	}
</style>
