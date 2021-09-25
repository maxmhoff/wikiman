<script lang="ts">
	let comment = 'Help me find the article';
	export const setComment = (type: string) => {
		switch(type) {
			case 'player-lost':
				comment = 'You failed to help me, I am doomed! 🥵';
				break;
			case 'player-won':
				comment = 'Wow, thank you buddy! 😎';
				break;
			default:
				comment = 'Help me find the article';
				break;
		}
	}
</script>

<main>
	<p class="comments">
		<span class="comments__wikiman">WIKIMAN:</span>
		<span class="comments__comment">"{comment}"</span>
	</p>
</main>

<style lang="scss">
   .comments {
        font-size: 20px;
        &__wikiman {

        }
        &__comment {

        }
   }
</style>
