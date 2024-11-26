<script>
	import { nightMode } from "$lib/stores";

	export let leftSliderWidth, nextWidth;
</script>

<div class="right-slider w-100 position-relative" style="background: {$nightMode ? '#E57A77' : '#F05039'};">
	<div
		class="left-slider h-100 {$nightMode ? 'border-light' : 'border-dark'}"
		style="width: {$leftSliderWidth}%; 
        background: {$nightMode ? '#7CA1CC' : '#1F449C'};">
	</div>
	<div
		class="tick-mark position-absolute
        {$nightMode ? 'bg-light' : 'bg-dark'}"
		style="left: calc({nextWidth}% - 5px);">
	</div>
</div>

<style>
	.right-slider {
		height: 150px;
	}

	.left-slider {
		border-right: 5px solid white;
	}

	.tick-mark {
		height: 32px;
		width: 5px;
		top: -32px;
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
