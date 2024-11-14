<script>
	import Title from "$lib/Title.svelte";
	import Score from "$lib/Score.svelte";
	import { nightMode } from "$lib/stores.js";
</script>

<!-- Main -->
<main class="min-vh-100 d-flex flex-column py-3 {$nightMode ? 'bg-dark' : 'bg-light'}">
	<Title />
	<!-- Score -->
	<Score />
</main>

<style>
	* {
		font-family: "Poppins", sans-serif;
	}

	main {
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
