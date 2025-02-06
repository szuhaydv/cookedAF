import type { ServerInit, Handle } from "@sveltejs/kit";

let ingredientData: any = null;

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.ingredients = ingredientData;

    const response = await resolve(event);
    return response;
};

export const init: ServerInit = async () => {
    try {
        ingredientData = await Bun.file("./static/ingredients.json").json()
    } catch (error) {
        console.log(error)
    }
};
