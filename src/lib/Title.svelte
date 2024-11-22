<script>
	import Processing from "$lib/Processing.svelte";
	import Electronics from "$lib/Electronics.svelte";
	import { nightMode, elementOpacities, audioStarted, pieceStarted } from "$lib/stores.js";
</script>

<div class="start-header w-100 d-flex flex-column gap-3 user-select-none" style="opacity: {$elementOpacities.startHeader}%;">
	<h1 class="text-center {$nightMode ? 'text-white' : 'text-dark'}">
		<i class="bi bi-circle-half"></i> One can only try to be like you
		<i class="bi bi-circle-half d-inline-block"></i>
	</h1>
	<div class="d-flex justify-content-center gap-2">
		<Processing />
		<Electronics />
	</div>
</div>

<style>
	.bi-circle-half.d-inline-block {
		transform: scaleX(-1);
	}
</style>
