<script>
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
			{#if crescendo}
				<div class="wedge position-absolute top-50 translate-middle-y {$nightMode ? 'bg-white' : 'bg-dark'}" style="width: {length}%; height: {height}px; left: {position}%; clip-path: {crescendo};"></div>
			{:else}
				<div class="wedge position-absolute top-50 translate-middle-y {$nightMode ? 'bg-white' : 'bg-dark'}" style="width: {length}%; height: {height}px; left: {position}%;"></div>
			{/if}
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
