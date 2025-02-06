import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const ingredients = event.locals.ingredients
    return {
        ingredients
    };
};
