<script lang="ts">
    let { ingredient, handleDelete } = $props();
</script>

<span
    class="flex gap-1 rounded-xl text-white px-4 py-1 bg-fuchsia-300 text-center h-max"
    contenteditable="false"
>
    {ingredient} <button onclick={handleDelete}><b>×</b></button>
</span>
