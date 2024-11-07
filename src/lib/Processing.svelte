<script>
	import * as Tone from "tone";
	import { nightMode, elementOpacities, currentPhase } from "$lib/stores.js";

	let audioReady = false;
	let mic, convolver, crusher, delay, underwater, vibrato, nonReverbEffects;

	async function startAudio() {
		Tone.getContext.latencyHint = "playback";
		await Tone.start();
		audioReady = true;
	}

	function startMic() {
		mic = new Tone.UserMedia().toDestination();
		convolver = new Tone.Convolver("/1st_baptist_nashville_balcony.wav").toDestination();

		crusher = new Tone.BitCrusher(5).toDestination();
		delay = new Tone.FeedbackDelay(0.5, 0.5).toDestination();
		underwater = new Tone.Filter(100, "lowpass").toDestination();
		vibrato = new Tone.Vibrato(15, 0.1).toDestination();

		nonReverbEffects = [crusher, delay, underwater, vibrato];

		mic.connect(convolver);

		mic.open()
			.then(() => {
				console.log("Microphone is open");
			})
			.catch((err) => {
				console.error("Microphone access denied", err);
			});
	}

	$: if (audioReady) {
		startMic();
	}

	$: if ($currentPhase === "Transition") {
		nonReverbEffects.forEach((effect) => effect.disconnect());
	}

	$: if ($currentPhase === "Noisy Birds") {
		mic.connect(crusher);
		convolver.connect(crusher);
	}

	$: if ($currentPhase === "Short Flutters" || $currentPhase === "Medium Flutters") {
		delay.delayTime.value = 0.5;
		mic.connect(delay);
		convolver.connect(delay);
	}

	$: if ($currentPhase === "Underwater") {
		delay.delayTime.value = 0.25;
		mic.connect(underwater);
		convolver.connect(underwater);
		mic.connect(delay);
		convolver.connect(delay);
		mic.connect(vibrato);
		convolver.connect(vibrato);
	}
</script>

{#if !audioReady}
	<button class="border-0 px-3 py-1 {$nightMode ? 'bg-secondary text-dark' : 'bg-secondary text-light'}" disabled="{$elementOpacities === 0 || true}" on:click="{startAudio}">Start Audio (disabled for now)</button>
{/if}
