<script lang='ts'>
	import Quiz from '../components/quiz.svelte';
</script>

<main>
	<section class="index">
		<Quiz />
	</section>
</main>

<style lang='scss'>
    .index {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
