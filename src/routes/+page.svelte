<script lang="ts">
  import IngredientBubble from "$lib/components/IngredientBubble.svelte";
  import { binSearchCont, debounce } from "$lib/helper";
  const ingredientsAvailable: string[] = $state([]);
  let currentlyAdding = $state("");
  let showMatches = $state(false);
  let { data } = $props();
  const allIngredients = data.ingredientData;
  let matchedIngredients: string[] = $state([]);
  let inputPos: DOMRect | undefined = $state();
  const bubbleLeft = $derived.by(() => {
    if (inputPos) {
      return inputPos.x + inputPos.width + 32 + "px";
    }
  });
  const bubbleTop = $derived.by(() => {
    if (inputPos) {
      return inputPos.y + inputPos.height / 2 + "px";
    }
  });

  const baseStyle =
    "py-1 relative text-left px-[10%] overflow-hidden text-ellipsis whitespace-nowrap w-full";
  const dividerStyle =
    "py-1 relative text-left px-[10%] overflow-hidden text-ellipsis whitespace-nowrap w-full after:absolute content-'' after:bottom-0 after:h-[1px] after:w-[80%] after:left-[10%] after:bg-gray";
  let input: any;
  function handleFocus() {
    input.focus();
  }

  function handleInput(e: any) {
    if (currentlyAdding.length >= 3) {
      inputPos = input.getBoundingClientRect();
      matchedIngredients = binSearchCont(currentlyAdding.trim(), allIngredients);
      showMatches = true;

      // handle possible selection
      if (e.data === " ") {
        if (matchedIngredients.length === 1) {
          ingredientsAvailable.push(matchedIngredients[0]);
          currentlyAdding = "";
          matchedIngredients = [];
        }
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

  function handleKeydown(e: any) {
    // handle delete
    if (e.code === "Backspace") {
      if (currentlyAdding === "") {
        ingredientsAvailable.pop();
      }
      // handle requested selection
    } else if (e.code === "Enter") {
      e.preventDefault();
      if (matchedIngredients.length === 1) {
        ingredientsAvailable.push(matchedIngredients[0]);
        currentlyAdding = "";
        matchedIngredients = [];
      }
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
    class="bg-white text-2xl rounded-3xl h-48 overflow-hidden
        w-[40rem] pl-8 pr-4 shadow-input border-8 border-black"
    onclick={handleFocus}
  >
    <div class="w-full h-full py-8 overflow-x-hidden overflow-y-auto flex flex-wrap gap-2">
      {#each ingredientsAvailable as ingredient, index}
        <IngredientBubble {ingredient} remove={() => handleDelete(index)} />
      {/each}
      <div class="relative h-max">
        <span
          contenteditable="true"
          onkeydown={handleKeydown}
          oninput={handleInput}
          role="input"
          autofocus
          class="focus:outline-none h-10 py-1"
          bind:innerText={currentlyAdding}
          bind:this={input}
        ></span>
        <!-- onkeydown={debouncedInput} -->
      </div>
    </div>
  </button>
  <a
    href="/recipe"
    class="bg-red flex justify-center items-center rounded-2xl border-[3px] border-black w-48 h-16 text-white font-inter italic text-4xl shadow-default shadow-slate-500 active:animate-bouncing"
    >Go!</a
  >
  {#if showMatches && matchedIngredients.length > 0 && inputPos}
    <ul
      style="top: {bubbleTop}; left: {bubbleLeft}"
      class="bubble fixed border border-black rounded-lg w-48 text-gray text-lg pt-1 -translate-y-1/2 bg-white"
    >
      {#each matchedIngredients.slice(0, 3) as ingredient, index}
        <li class={index !== matchedIngredients.slice(0, 3).length - 1 ? dividerStyle : baseStyle}>
          {ingredient}
        </li>
      {/each}
      {#if matchedIngredients.length > 3}
        <li class="py-1 text-sm text-center">
          +<b>{matchedIngredients.length - 3}</b> more
        </li>
      {/if}
    </ul>
  {/if}
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
