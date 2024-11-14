<script>
	import { nightMode } from "$lib/stores.js";
	export let length, height, position, crescendo;
</script>

{#if crescendo}
	<div class="wedge position-absolute top-50 translate-middle-y {$nightMode ? 'bg-white' : 'bg-dark'}" style="width: {length}%; height: {height}px; left: {position}%; clip-path: {crescendo};"></div>
{:else}
	<div class="wedge position-absolute top-50 translate-middle-y {$nightMode ? 'bg-white' : 'bg-dark'}" style="width: {length}%; height: {height}px; left: {position}%;"></div>
{/if}
