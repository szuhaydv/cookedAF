<script lang="ts">
  import IngredientBubble from "$lib/components/IngredientBubble.svelte";
  import { binSearchCont, debounce } from "$lib/helper";
  const ingredientsAvailable: string[] = $state([]);
  let currentlyAdding = $state("");
  let showMatches = $state(false);
  let { data } = $props();
  const allIngredients = data.ingredientData;
  let matchedIngredients: string[] = $state([]);

  let input: any;
  function handleFocus() {
    input.focus();
  }

  function handleInput(e: any) {
    if (currentlyAdding.length >= 3) {
      matchedIngredients = binSearchCont(currentlyAdding.trim(), allIngredients);
      showMatches = true;

      // handle possible selection
      if (e.data === " ") {
        if (matchedIngredients.length === 1) {
          ingredientsAvailable.push(currentlyAdding);
          currentlyAdding = "";
          matchedIngredients = [];
        }
        // handle requested selection
      } else if (e.inputType === "") {
      }

      // handle showing/hiding bubble
    } else {
      showMatches = false;
    }
  }

  function handleDelete(id: number) {
    ingredientsAvailable.splice(id, 1);
    if (ingredientsAvailable.length === 0) {
      input.style.width = "100%";
    }
  }

  const debouncedInput = debounce(handleInput, 100);
</script>

<main class="h-[calc(100dvh-4rem)] flex flex-col gap-6 items-center justify-center">
  <h1 class="font-inter font-normal">
    <span class="line-through text-2xl italic text-slate-600">Looking for a recipe...</span><br
    /><span class="text-4xl">The next recipe is <b class="font-bold">looking for you!</b></span>
  </h1>
  <button
    class="bg-white text-2xl border-8 border-black rounded-3xl h-48
        w-[40rem] px-8 py-8 flex flex-wrap gap-2 shadow-input"
    onclick={handleFocus}
  >
    {#each ingredientsAvailable as ingredient, index}
      <IngredientBubble {ingredient} remove={() => handleDelete(index)} />
    {/each}
    <div class="relative">
      <span
        placeholder={ingredientsAvailable.length === 0
          ? "List the ingredients in your fridge..."
          : ""}
        contenteditable="true"
        oninput={handleInput}
        role="input"
        autofocus
        class="focus:outline-none h-10 py-1"
        bind:innerText={currentlyAdding}
        bind:this={input}
      ></span>
      <!-- onkeydown={debouncedInput} -->
      {#if showMatches && matchedIngredients.length > 0}
        <ul
          class="bubble absolute top-1/2 -translate-y-1/2 left-[calc(100%+2rem)]
                    border border-black rounded-lg w-48 bg-white text-gray text-lg pt-1"
        >
          {#each matchedIngredients.slice(0, 3) as ingredient, index}
            <li
              class="py-1 relative after:absolute after:bottom-0 after:h-[1px]
                    after:w-[80%] after:left-[10%] after:bg-gray text-left pl-[15%]"
            >
              {ingredient}
            </li>
          {/each}
          {#if matchedIngredients.length > 3}
            <li
              class="py-1 relative after:absolute after:bottom-0 after:h-[1px]
                    after:w-[80%] after:left-[10%] after:bg-gray-300 text-sm"
            >
              +<b>{matchedIngredients.length - 3}</b> more
            </li>
          {/if}
        </ul>
      {/if}
    </div>
  </button>
  <a
    href="/recipe"
    class="bg-red flex justify-center items-center rounded-2xl border-[3px] border-black w-48 h-16 text-white font-inter italic text-4xl shadow-default shadow-slate-500 active:animate-bouncing"
    >Go!</a
  >
</main>

<style>
  .bubble::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -0.5rem;
    width: 1rem;
    height: 1rem;
    background: white;
    border-left: 1px solid #000;
    border-top: 1px solid #000;
    transform: translateY(-50%) rotate(-45deg);
  }
</style>
