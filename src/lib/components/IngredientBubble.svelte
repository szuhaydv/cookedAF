<script lang="ts">
    let { ingredient, remove } = $props();
</script>

<span
    class="flex gap-1 rounded-xl text-white px-4 py-1 bg-green text-center h-max"
>
    {ingredient}
    <button onclick={remove}><b class="hover:text-red">×</b></button>
</span>
