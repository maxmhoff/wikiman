<script lang='ts'>
	import Quiz from '../components/quiz.svelte';
</script>

<main>
	<section class="frontpage">
		<h1 class="frontpage__title">WIKIMAN</h1>
		<Quiz />
	</section>
</main>

<style lang='scss'>
    .frontpage {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 750px;
        margin-left: auto;
        margin-right: auto;
        &__title {
            font-size: 48px;
            margin-top: 100px;
        }
    }
</style>
