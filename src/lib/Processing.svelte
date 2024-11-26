<script>
	import { nightMode, pieceStarted } from "$lib/stores";
	import { onMount } from "svelte";
	import OSC from "osc-js";

	let osc;

	function startPiece() {
		$pieceStarted = true;
		osc.send(new OSC.Message("/pieceStarted"));
	}

	onMount(() => {
		osc = new OSC();
		osc.open({ port: 3333 });
	});
</script>

{#if !$pieceStarted}
	<button class="border-0 px-3 py-1 {$nightMode ? 'bg-white text-dark' : 'bg-dark text-light'}" onclick={startPiece}>Start</button>
{/if}

<style>
	button {
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
