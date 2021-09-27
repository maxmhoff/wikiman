import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface WikiArticle {
    content_urls: {
        desktop: {
            page: string,
        },
    },
    description: string,
    extract: string,
    title: string,
    thumbnail: {
        height: number,
        source: string,
        width: number,
    }
}

export const article: Writable<WikiArticle> = writable({
    content_urls: {
        desktop: {
            page: '',
        },
    },
    description: '',
    extract: '',
    title: '',
    thumbnail: {
        height: 0,
        source: '',
        width: 0,
    }
});

export const fetchArticle = async () => {
    const MAX_CHARACTERS = 34
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary', { method: 'GET', redirect: 'follow'});
    const loadedArticle = await response.json()
    loadedArticle.title.length > MAX_CHARACTERS ? await fetchArticle() : article.set(loadedArticle);
}