<script>
	import { nightMode } from "$lib/stores.js";

	export let phase;
</script>

{#if phase}
	<div class="w-100 position-relative overflow-hidden" style="min-height: 40px;">
		{#each phase.activeArticulations as { name, position }}
			<h4 class="articulation-text position-absolute text-nowrap {$nightMode ? 'text-light' : 'text-dark'}" style="left: {position}%;">{name}</h4>
		{/each}
	</div>
{/if}

<style>
	.articulation-text {
		transition: opacity 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
