import { writable } from "svelte/store";

export const guess= writable('');

export const addNewGuess = (letter: string) => {
    guess.set(letter);
}