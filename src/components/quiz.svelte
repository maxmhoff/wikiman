<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Letters from './quiz-components/letters.svelte';
	import { article, fetchArticle } from '../stores/articlestore';
	import { guess } from '../stores/guessstore';
	import { calcDifficulty } from '../utility/ratingcalc';

	let lettersComponent: any;

	let answer: string;
	let hiddenWord: string;
	let extract: string;
	let url: string;
	let thumbnail: any;

	const MAX_LIVES: string[] = ['💗', '💗', '💗', '💗', '💗', '💗', '💗'];
	let difficulty;
	let lives: string[] = [...MAX_LIVES];
	let playerLost = false;
	let playerWon = false;
	let firedFirst = false;

	guess.subscribe((guess) => {
		if (!firedFirst) {
			firedFirst = true;
			return;
		} else {
			let correctGuess = false;
			answer.split('').forEach((letter, idx) => {
				if (letter === guess) {
					hiddenWord = hiddenWord.substr(0, idx) + letter + hiddenWord.substr(idx + 1);
					correctGuess = true;
					if (!hiddenWord.includes('_')) {
						playerWon = true;
						lettersComponent.lockLetters();
					}
				}
			});
			if (correctGuess === false) {
				lives.pop();
				lives = [...lives];
				if (lives.length === 0) {
					hiddenWord = answer;
					playerLost = true;
					lettersComponent.lockLetters();
				}
			}
		}
	});

	

	const newArticle = async () => {
		await fetchArticle();
		answer = $article.title.toUpperCase();
		difficulty = calcDifficulty(answer);
		extract = $article.extract;
		url = $article.content_urls.desktop.page;
		thumbnail = $article.thumbnail;
		hiddenWord = answer.replace(/[a-z]/gi, '_');
		lettersComponent.resetLetters();
		
	};

	const restartGame = () => {
		hiddenWord = null;
		lives = [...MAX_LIVES];
		playerWon = false;
		playerLost = false;
		newArticle();
	};

	onMount(() => {
		newArticle();
	});
</script>

<section class="quiz">
	<p class="quiz__healthbar">
		{#each Array(MAX_LIVES.length) as life, idx}
			{#if lives[idx]}
				<span>{lives[idx]}</span>
			{:else}
				<span>🤍</span>
			{/if}
		{/each}
	</p>
	<p class="quiz__hidden-word">{hiddenWord ? hiddenWord : ''}</p>
	<div class="quiz__wiki-description">
		{#if playerLost || playerWon}
			{#if thumbnail?.source}
				<img
					in:fade
					class="quiz__thumbnail"
					width={thumbnail.width}
					height={thumbnail.height}
					src={thumbnail.source}
					alt="Thumbnail from Wikipedia"
				/>
			{/if}
			<p class="quiz__extract">{extract}</p>
			<button class="quiz__restart-button" on:click={restartGame}> Try again </button>
			<p class="quiz__wiki-link">
				<a href={url} target="__blank">See the article on Wikipedia.</a>
			</p>
		{/if}
	</div>
</section>
{#if !playerLost && !playerWon}
	<Letters bind:this={lettersComponent} />
{/if}

<style lang="scss">
	.quiz {
		position: relative;
		margin-top: 80px;
		width: 100%;

		&__healthbar {
			position: absolute;
			height: 21px;
			text-align: left;
		}
		&__hidden-word {
			min-height: 48px;
			font-family: 'Courier New', Courier, monospace;
			text-align: center;
			font-size: 24px;
			line-height: 2;
			letter-spacing: 7px;
			padding-top: 48px;
		}
		&__wiki-description {
			width: fit-content;
			margin: 0 auto;
			text-align: center;
			overflow: hidden;
		}

		&__restart-button {
			text-transform: uppercase;
			font-weight: 500;
			width: 160px;
			height: 45px;
			background-color: hotpink;
			color: white;
			border-radius: 5px;
			margin-top: 30px;
			border: none;
			&:hover {
				cursor: pointer;
			}
		}

		&__thumbnail {
			margin-bottom: 24px;
			border-radius: 16px;
		}

		&__extract {
			text-align: left;
			font-size: 1.0625rem;
			margin: 0;
			line-height: 1.7;
		}

		&__wiki-link {
			margin-top: 35px;
			a,
			a:visited {
				color: black;
			}
			a:hover {
				color: hotpink;
			}
		}
	}
</style>
