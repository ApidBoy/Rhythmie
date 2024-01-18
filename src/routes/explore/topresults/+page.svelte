<script>
	// @ts-nocheck

	import { activeRouteDerived, setActiveRoute } from '../../../activeRoute';
	import { onMount } from 'svelte';
	import Searchpage from '../../../components/explorepageComponents/Searchpage.svelte';
	import { searchResultStore } from "../../../store";
	import SearchPageSkeleton from '../../../components/skeletons/explorepage/SearchPageSkeleton.svelte';

	let activeRoute = '';
	let searchResults = '';

	activeRouteDerived.subscribe((value) => {
		activeRoute = value;
	});
	searchResultStore.subscribe((value) => {
		searchResults = value;
	})
	console.log(searchResults);

	onMount(() => {
		setActiveRoute('/explore/topresults');
	});
</script>

<section>
	{#if searchResults && searchResults !== '' && searchResults.length !== 0}
		<Searchpage />
	{:else}
		<SearchPageSkeleton />
	{/if}
</section>

<style>
	section {
        min-height: 100vh;
        overflow-x: hidden;
        background: #050505;
        color:#fff;
        z-index: 0;
        padding-left: 10vw;
		background-image: linear-gradient(to bottom, #302f2f, #1b1b1b, #090909, #050505, #050505);
	}
</style>
