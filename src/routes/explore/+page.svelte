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
		overflow-x: hidden;
		background: #050505;
		border-radius: 60px;
		border-top-right-radius: 0px;
		color: #fff;
		height: 89vh;
		z-index: 0;
		width: 85.9%;
		position: absolute;
		left: 285px;
	}
</style>
