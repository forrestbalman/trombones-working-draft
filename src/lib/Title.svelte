<script>
	import Processing from "$lib/Processing.svelte";
	import { nightMode, elementOpacities, audioStarted, pieceStarted } from "$lib/stores.js";

	function startPiece() {
		$pieceStarted = true;
	}
</script>

<div class="start-header w-100 d-flex flex-column gap-3 user-select-none" style="opacity: {$elementOpacities.startHeader}%;">
	<h1 class="text-center {$nightMode ? 'text-white' : 'text-dark'}">
		<i class="bi bi-circle-half"></i> One can only try to be like you
		<i class="bi bi-circle-half d-inline-block"></i>
	</h1>
	<div class="d-flex justify-content-center gap-2">
		{#if $audioStarted}
			<button class="border-0 px-3 py-1 {$nightMode ? 'bg-white text-dark' : 'bg-dark text-light'}" disabled="{$elementOpacities === 0}" on:click|preventDefault="{startPiece}">Start</button>
		{:else}
			<Processing />
		{/if}
	</div>
</div>

<style>
	* {
		font-family: "Poppins", sans-serif;
	}

	button {
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}

	.bi-circle-half.d-inline-block {
		transform: scaleX(-1);
	}
</style>
