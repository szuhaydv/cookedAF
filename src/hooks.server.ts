import type { ServerInit } from "@sveltejs/kit";

export let ingredientData = [];

export const init: ServerInit = async () => {
    try {
        ingredientData = await Bun.file("./static/ingredients.json").json()
    } catch (error) {
        console.log(error)
    }
};
