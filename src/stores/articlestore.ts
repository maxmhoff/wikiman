import { writable } from "svelte/store";

export const article = writable(null);

export const fetchArticle = async () => {
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', { method: 'GET', redirect: 'follow'});
    const loadedArticle = await response.json()
    article.set(loadedArticle);
}