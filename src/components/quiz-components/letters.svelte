<script lang="ts">
	import { addNewGuess } from '../../stores/guessstore';
	import alphabet from '../../utilities/alphabet';
	let letterObjects = alphabet.map((letter) => ({ letter, wasClicked: false }));
	const handleOnClick = (letterObject: { letter: string; wasClicked: boolean }, i: number) => {
		addNewGuess(letterObject.letter);
		const tempList = letterObjects;
		tempList[i] = { letter: letterObject.letter, wasClicked: true };
		letterObjects = [...tempList];
	};
	export const resetLetters = () => {
		letterObjects = alphabet.map((letter) => ({ letter, wasClicked: false }));
	};
	export const lockLetters = () => {
		letterObjects = alphabet.map((letter) => ({ letter, wasClicked: true }));
	};
</script>

<section class="letters">
	<ul class="letters__list">
		{#each letterObjects as letterObject, idx}
			<li class="letters__list-item">
				<button
					class="letters__letter"
					on:click={() => handleOnClick(letterObject, idx)}
					disabled={letterObject.wasClicked}>{letterObject.letter}</button
				>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	.letters {
		&__list {
			padding: 0;
			list-style-type: none;
			direction: ltr;
		}
		&__list-item {
			margin: 8px;
			display: inline-block;
		}
		&__letter {
			font-size: 17px;
			border-radius: 10px;
			width: 40px;
			height: 40px;
			background-color: white;
			border: 2px solid hotpink;
			transition: transform 0.3s ease;
			&:disabled {
				transform: rotateY(180deg);
				color: transparent;
			}
		}
	}
</style>
