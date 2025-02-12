import { writable } from "svelte/store";

export const fridgeContents = writable<string[]>([])
