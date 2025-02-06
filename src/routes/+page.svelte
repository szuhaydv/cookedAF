<script lang="ts">
    import IngredientBubble from "$lib/components/IngredientBubble.svelte";
    const validIngredients = new Set(["salmon", "rice", "broccoli", "garlic"]);
    let ingredients: string[] = $state([]);
    let currentlyAdding = $state("");

    let input: any;
    function handleFocus(e: any) {
        input.focus();
    }

    function handleInput(e: any) {
        const length =
            e.target.value.length < 2 ? "2" : e.target.value.length + 1;
        e.target.style.width = length + "ch";
        if (e.code === "Space" || e.code === "Enter") {
            const text = e.target.value;
            const words = text.trim().split(/\s+/);
            const lastWord = words[words.length - 1].toLowerCase();
            ingredients.push(lastWord);
            currentlyAdding = "";
            e.preventDefault();
            e.target.style.width = "2ch";
        } else if (e.code === "Backspace") {
            if (currentlyAdding === "") {
                ingredients.pop();
            }
        }
    }

    function handleDelete(id: number) {
        ingredients.splice(id, 1);
    }
</script>

<main
    class="h-[calc(100dvh-4rem)] flex flex-col gap-6 items-center justify-center"
>
    <h1 class="font-inter font-normal">
        <span class="line-through text-2xl italic text-slate-600"
            >Looking for a recipe...</span
        ><br /><span class="text-4xl"
            >The next recipe is <b class="font-bold">looking for you!</b></span
        >
    </h1>
    <button
        class="bg-white text-2xl border-8 border-black rounded-3xl h-48
        w-[40rem] px-8 py-8 flex flex-wrap gap-2"
        onclick={handleFocus}
    >
        {#each ingredients as ingredient, index}
            <IngredientBubble
                {ingredient}
                handleDelete={() => handleDelete(index)}
            />
        {/each}
        <input
            onkeydown={handleInput}
            autofocus
            type="text"
            class="focus:outline-none h-10 w-[2ch]"
            bind:value={currentlyAdding}
            bind:this={input}
        />
    </button>
    <button
        class="bg-default-red rounded-2xl border-[3px] border-black w-48 h-16 text-white font-inter italic text-4xl shadow-default shadow-slate-500 active:animate-bouncing"
        >Go!</button
    >
</main>
