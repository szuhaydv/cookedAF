import type { PageServerLoad } from './$types';
import { ingredientData } from '../hooks.server';

export const load: PageServerLoad = async () => {
    return { ingredientData }
};
