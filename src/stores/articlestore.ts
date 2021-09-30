import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type WikiArticle from '../models/wiki-response';

export const article: Writable<WikiArticle> = writable({});

const isArticleWorthy = (article: WikiArticle): boolean => {
    const MAX_CHARACTERS = 34;
    if(article.title.length > MAX_CHARACTERS) { return false; }
    if(!article.description) { return false; }
    if(!article.thumbnail) { return false; }
    return true;
}

export const fetchArticle = async () => {
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', { method: 'GET', redirect: 'follow'});
    const loadedArticle = await response.json()
    isArticleWorthy(loadedArticle) ? article.set(loadedArticle) : await fetchArticle();
}