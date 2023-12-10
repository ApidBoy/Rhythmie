<script>
	// @ts-nocheck

	import { activeRouteDerived, setActiveRoute } from '../../activeRoute';
	import { onMount } from 'svelte';
	import SearchPageSkeleton from '../../components/skeletons/explorepage/SearchPageSkeleton.svelte';

	let activeRoute = '';

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});

	onMount(() => {
		setActiveRoute('/mylibrary');
	});
</script>

<section>
    <SearchPageSkeleton />
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
