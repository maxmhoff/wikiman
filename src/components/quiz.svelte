<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Letters from './quiz-components/letters.svelte';
	import { article, fetchArticle } from '../stores/articlestore';
	import { guess } from '../stores/guessstore';
	import { getDifficulty } from '../utilities/ratingcalc';
	import preload from '../utilities/preload';

	let lettersComponent: any;

	let answer: string;
	let hiddenWord: string;

	const MAX_LIVES: string[] = ['💗', '💗', '💗', '💗', '💗', '💗', '💗'];
	let difficulty: string;
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

	const getArticle = async () => {
		await fetchArticle();
		answer = $article.title.toUpperCase();
		difficulty = getDifficulty(answer, $article.description);
		hiddenWord = answer.replace(/[a-z]/gi, '_');
		lettersComponent.resetLetters();
	};

	const restartGame = () => {
		hiddenWord = null;
		lives = [...MAX_LIVES];
		playerWon = false;
		playerLost = false;
		getArticle();
	};

	onMount(() => {
		getArticle();
	});
</script>

<section class="quiz">
	<div class="quiz__status-bar">
		<p class="quiz__health-bar">
			{#each Array(MAX_LIVES.length) as life, idx}
				{#if lives[idx]}
					<span>{lives[idx]}</span>
				{:else}
					<span>🤍</span>
				{/if}
			{/each}
		</p>
		<p>{difficulty ? 'Difficulty: ' + difficulty : ''}</p>
	</div>
	<p class="quiz__hidden-word">{hiddenWord ? hiddenWord : ''}</p>
	{#if !playerLost && !playerWon}
		<p class="quiz__description">{$article.description ? $article.description : ''}</p>
	{:else}
		{#await preload($article.thumbnail?.source)}
			<p class="quiz__spinner">Loading</p>
		{:then}
			<div in:fade class="quiz__wiki-reveal">
				<figure
					class="quiz__figure"
					style="width: {$article.thumbnail.width}px; height:{$article.thumbnail.height}px;"
				>
					<img src={$article.thumbnail.source} alt="Thumbnail from Wikipedia" />
				</figure>

				<p class="quiz__extract">{$article.extract}</p>
				<button class="quiz__restart-button" on:click={restartGame}> Try again </button>
				<p class="quiz__wiki-link">
					<a href={$article.content_urls.desktop.page} target="__blank">See the article on Wikipedia.</a>
				</p>
			</div>
		{/await}
	{/if}
</section>
{#if !playerLost && !playerWon}
	<Letters bind:this={lettersComponent} />
{/if}

<style lang="scss">
	.quiz {
		position: relative;
		width: 100%;
		height: 100%;
		margin-top: 0;

		&__status-bar {
			position: absolute;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__health-bar {
			height: 21px;
		}

		&__hidden-word {
			min-height: 48px;
			font-family: 'Courier New', Courier, monospace;
			text-align: center;
			font-size: 24px;
			line-height: 2;
			letter-spacing: 7px;
			padding-top: 48px;
			margin-bottom: 16px;
		}

		&__description {
			text-align: center;
			font-size: 18px;
			min-height: 21px;
			margin-bottom: 12px;
		}

		&__spinner {
			text-align: center;
		}

		&__wiki-reveal {
			width: fit-content;
			margin: 0 auto;
			text-align: center;
			overflow: hidden;
		}

		&__figure {
			margin: 0 auto 24px;
			border-radius: 16px;
		}

		&__extract {
			text-align: left;
			font-size: 1.0625rem;
			margin: 0;
			line-height: 1.7;
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
	//TODO: Create consistent media queries.
	@media (min-width: 768px) {
		.quiz {
			margin-top: 15vh;
		}
	}
</style>
