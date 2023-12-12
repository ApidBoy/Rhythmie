<script>
    import Topbar from "../components/Topbar.svelte";
    import Sidebar from "../components/Sidebar.svelte";
	import Player from "../components/Player.svelte";
    import './styles.css';
</script>

<Topbar />
<Sidebar />
<Player />

<main>
    <slot />
</main>