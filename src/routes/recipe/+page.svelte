<script>
  let recipes = [
    {
      title: "English Breakfast",
      serves: 4,
      prepTime: 10,
      makeTime: 25,
    },
    {
      title: "English Breakfast",
      serves: 4,
      prepTime: 10,
      makeTime: 25,
    },
  ];
</script>

<main class="h-[calc(100dvh-4rem)] flex flex-col items-center justify-between w-full">
  <ul class="recipe-grid w-full">
    {#each recipes as recipe}
      <article class="py-4 px-8 bg-white rounded-2xl flex flex-col gap-9 h-max">
        <div class="relative">
          <img class="w-80 h-52 rounded-2xl" src="./images/recipe.jpg" alt="chili con carna" />
          <h2
            class="absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green
            text-white font-cheeseBread px-4 py-1 whitespace-nowrap rounded-lg text-2xl"
          >
            {recipe.title}
          </h2>
        </div>
        <ul class="flex justify-between">
          <li class="flex flex-col items-center gap-2">
            <img src="./images/serving.svg" alt="People" class="w-6 h-6" />
            <span class="block font-inter text-[1rem]">Serves {recipe.serves}</span>
          </li>
          <li class="flex flex-col items-center gap-2">
            <img src="./images/prep.svg" alt="Knife" class="w-6 h-6" />
            <span class="block font-inter text-[1rem]">Prep: {recipe.prepTime}min</span>
          </li>
          <li class="flex flex-col items-center gap-2">
            <img src="./images/cook.svg" alt="Pot" class="w-6 h-6" />
            <span class="block font-inter text-[1rem]">Cook: {recipe.makeTime}min</span>
          </li>
        </ul>
      </article>
    {/each}
  </ul>
  <div class="flex flex-col gap-2 py-3 px-6 bg-white rounded-2xl mb-6">
    <span>Showing 1-10 of 94 results</span>
    <ul class="flex gap-2">
      {#each recipes as _recipe, index}
        <li>
          <button
            class="rounded-lg bg-white text-base font-cheeseBread border border-light-gray
            w-8 h-8 flex items-center justify-center"
          >
            {index}
          </button>
        </li>
      {/each}
    </ul>
  </div>
</main>

<style>
  .recipe-grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, 24rem);
    gap: 3rem;
    max-width: 51rem;
  }
</style>
