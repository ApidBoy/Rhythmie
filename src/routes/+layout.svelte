<script>
    import Topbar from "../components/Topbar.svelte";
    import Sidebar from "../components/Sidebar.svelte";
    import './styles.css';
</script>

<Topbar />
<Sidebar />

<main>
    <slot />
</main>