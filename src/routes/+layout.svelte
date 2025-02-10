<script lang="ts">
    import "../app.css";
    let { children } = $props();
</script>

<header class="h-16 w-64 bg-black border-r-8 border-r-red rounded-br-full">
    <a
        class="w-[92%] font-lobster text-4xl h-full flex justify-center items-center text-white"
        href="/">cookedAF</a
    >
</header>
{@render children()}
