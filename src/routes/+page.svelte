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

  let selectedIngredient = $state(0);

  const baseStyle =
    "py-1 relative text-left decoration-4 px-[10%] overflow-hidden text-ellipsis whitespace-nowrap w-full";
  const dividerStyle =
    "py-1 relative text-left decoration-4 px-[10%] overflow-hidden text-ellipsis whitespace-nowrap w-full after:absolute content-'' after:bottom-0 after:h-[1px] after:w-[80%] after:left-[10%] after:bg-gray";
  let input: any;
  function handleFocus() {
    input.focus();
  }

  function handleInput(e: any) {
    if (currentlyAdding.length >= 3) {
      inputPos = input.getBoundingClientRect();
      const prevMatched = matchedIngredients.slice(0, 3);
      matchedIngredients = binSearchCont(currentlyAdding.trim(), allIngredients);
      if (JSON.stringify(prevMatched) != JSON.stringify(matchedIngredients.slice(0, 3))) {
        selectedIngredient = 0;
      }
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
    switch (e.code) {
      // handle delete
      case "Backspace":
        if (currentlyAdding === "") {
          ingredientsAvailable.pop();
        }
        break;
      // handle requested selection
      case "Enter":
        e.preventDefault();
        if (!ingredientsAvailable.includes(matchedIngredients[selectedIngredient])) {
          ingredientsAvailable.push(matchedIngredients[selectedIngredient]);
          currentlyAdding = "";
          matchedIngredients = [];
          selectedIngredient = 0;
        }
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          selectedIngredient -= 1;
          if (selectedIngredient < 0) selectedIngredient = 2;
        } else {
          selectedIngredient += 1;
          if (selectedIngredient > 2) selectedIngredient = 0;
        }
        break;
    }
  }

  const debouncedInput = debounce(handleInput, 100);
</script>

<main class="h-[calc(100dvh-4rem)] flex flex-col gap-6 items-center justify-center relative">
  <img
    src="./images/broccoli.svg"
    alt="broccoli"
    class="absolute opacity-55 top-[25%] left-3/4 w-52 h-52"
  />
  <img
    src="./images/steak.svg"
    alt="steak"
    class="absolute opacity-70 top-[10%] left-[10%] w-72 h-72 rotate-[20deg]"
  />
  <img
    src="./images/eggs.svg"
    alt="eggs"
    class="absolute opacity-70 bottom-[10%] left-[15%] w-52 h-52 scale-x-[-1]"
  />
  <img src="./images/rice.svg" alt="rice" class="absolute opacity-70 bottom-0 left-3/4 w-52 h-52" />
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
          class:text-red={currentlyAdding.length >= 3 && matchedIngredients.length === 0}
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
      class="bubble drop-shadow-lg fixed border border-black rounded-lg w-48 text-gray text-lg pt-1 -translate-y-1/2 bg-white"
    >
      {#each matchedIngredients.slice(0, 3) as ingredient, index}
        <li
          class:text-green={selectedIngredient === index}
          class:font-bold={selectedIngredient === index}
          class={index !== matchedIngredients.slice(0, 3).length - 1 ? dividerStyle : baseStyle}
          class:line-through={ingredientsAvailable.includes(ingredient)}
        >
          {ingredient}
          {#if selectedIngredient === index && !ingredientsAvailable.includes(ingredient)}
            <img
              src="./images/enter.png"
              alt="Enter button"
              class="absolute left-[80%] top-1/2 -translate-y-1/2 bg-white"
            />
          {/if}
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
