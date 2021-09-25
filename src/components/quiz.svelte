<script lang="ts">
	import { onMount } from 'svelte';
	import Letters from './quiz-components/letters.svelte';
	import { article, fetchArticle } from '../stores/articlestore';
	import { guess } from '../stores/guessstore';

	let lettersComponent: any;

	let answer: string;
	let hiddenWord: string;
	let extract: string;
	let url: string;
	const MAX_LIVES: string[] = ['💗', '💗', '💗', '💗', '💗', '💗', '💗'];
	let lives: string[] = MAX_LIVES;
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
		extract = $article.extract;
		url = $article.content_urls.desktop.page;
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

<main>
	<section class="quiz">
		<p class="quiz__lives">
			{#each lives as life}{life}{/each}
		</p>
		<p class="quiz__hidden-word">{hiddenWord ? hiddenWord : ''}</p>
		<div class="quiz__player-message">
			{#if playerLost}
				<p class="quiz__comment">You failed to help WIKIMAN! 🥵</p>
				<button class="quiz__restart-button" on:click={restartGame}>
                    Try a new Wikipedia Article
                </button>
				<p>{extract}</p>
				<p class="quiz__wiki-link"><a href={url} target="__blank">See the entire article on Wikipedia.</a></p>
			{/if}
			{#if playerWon}
				<p  class="quiz__comment">Wow, you made it 😎 Good job!</p>
				<button class="quiz__restart-button" on:click={restartGame}
					>Try a new Wikipedia Article</button
				>
				<p class="quiz__extract">{extract}</p>
				<p class="quiz__wiki-link"><a href={url} target="__blank">See the entire article on Wikipedia.</a></p>
			{/if}
		</div>
        {#if !playerLost && !playerWon}
		    <Letters bind:this={lettersComponent} />
        {/if}
	</section>
</main>

<style lang="scss">
	.quiz {
		&__lives {
			height: 21px;
			text-align: left;
		}
		&__hidden-word {
			font-family: 'Courier New', Courier, monospace;
			height: 86px;
			text-align: center;
			font-size: 24px;
			line-height: 2;
			letter-spacing: 7px;
		}
		&__player-message {
			min-height: 75px;
			text-align: center;
			margin-bottom: 30px;
			overflow: hidden;
		}

		&__comment {
            font-size: 24px;
            margin-top: 0;
			margin-bottom: 50px;
		}

		&__restart-button {
            text-transform: uppercase;
			width: 300px;
			height: 50px;
			background-color: hotpink;
			color: white;
			border-radius: 5px;
			margin-bottom: 50px;
            border: 2px solid black;
		}

		&__extract {
			line-height: 1.5;
			text-align: left;
		}

        &__wiki-link {
            margin-top: 35px;
        }
	}
</style>
