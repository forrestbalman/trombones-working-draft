<script>
	import { nightMode, elementOpacities } from "$lib/stores.js";

	export let phase, phaseNameDisplay, moveCounter;
</script>

{#if phase}
	<div class="w-100 d-flex align-items-end">
		<h5 class="phase-text user-select-none mb-5 fw-light {$nightMode ? 'text-white' : 'text-dark'}" style="opacity: {$elementOpacities.phaseName}%; min-height: 24px;">
			{#if phaseNameDisplay}
				{phaseNameDisplay}
				{#if phase.mute}
					<i class="bi bi-circle-fill {$nightMode ? 'text-white' : 'text-dark'}"></i>
				{/if}
			{/if}
		</h5>
		<h1 class="moveCounter-text user-select-none mb-5 position-absolute start-50 translate-middle-x {$nightMode ? 'text-white' : 'text-dark'} {moveCounter !== 0 ? 'opacity-100' : 'opacity-0'}">
			{moveCounter}
		</h1>
	</div>
{/if}

<style>
	.phase-text,
	.moveCounter-text {
		transition: opacity 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
