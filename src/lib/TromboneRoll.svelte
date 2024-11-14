<script>
	import Wedge from "$lib/Wedge.svelte";
	import { nightMode } from "$lib/stores.js";

	export let phase, tromboneRollWidth;
</script>

<div
	class="trombone-roll w-100 position-relative overflow-hidden {$nightMode ? 'border-white' : 'border-dark'}"
	bind:clientWidth="{tromboneRollWidth}"
	style="border-top: 2px solid {$nightMode ? 'white' : '#212529'}; border-bottom: 2px solid {$nightMode ? 'white' : '#212529'}; border-left: 2px solid {$nightMode ? 'white' : '#212529'}">
	<div class="endzone-right position-absolute h-100 opacity-50" style="background: {$nightMode ? 'white' : '#212529'}"></div>
	{#if phase}
		{#each phase.wedges as { length, height, position, crescendo }}
			<Wedge {length} {height} {position} {crescendo} />
		{/each}
	{/if}
</div>

<style>
	.trombone-roll {
		height: 100px;
	}

	.endzone-right {
		width: 2px;
		left: 20px;
	}
</style>
