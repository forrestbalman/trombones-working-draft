<script>
	import * as Tone from "tone";
	import { nightMode, audioStarted, currentPhase, pieceStarted, buffersLoaded, micVolume } from "$lib/stores.js";

	let audioReady = false;
	let mic, convolver, crusher, delay, underwater, subterranean, explosive, lowEnergy, vibrato, effects, meter;

	async function startAudio() {
		await Tone.start();
		Tone.setContext(new Tone.Context({ latencyHint: "interactive" }));
		audioReady = true;
	}

	function startPiece() {
		$pieceStarted = true;
	}

	function startMic() {
		mic = new Tone.UserMedia();
		crusher = new Tone.BitCrusher(12);
		delay = new Tone.FeedbackDelay(0.5, 0.5);
		underwater = new Tone.Filter(400, "lowpass");
		subterranean = new Tone.Filter(200, "lowpass");
		lowEnergy = new Tone.Filter(300, "lowpass");
		vibrato = new Tone.Vibrato(15, 0.1);
		explosive = new Tone.Phaser({
			frequency: 15,
			octaves: 5,
			baseFrequency: 1000,
		});
		convolver = new Tone.Convolver("/1st_baptist_nashville_balcony.wav").toDestination();

		mic.volume.value = -Infinity;

		effects = [crusher, delay, underwater, subterranean, vibrato, convolver];

		mic.open()
			.then(() => {
				console.log("Microphone is open");
			})
			.catch((err) => {
				console.error("Microphone access denied", err);
			});

		meter = new Tone.Meter();
		mic.connect(meter);
		setInterval(() => {
			$micVolume = meter.getValue();
			console.log($micVolume);
		}, 25);
	}

	$: if (audioReady) {
		startMic();
		$audioStarted = true;
	}

	$: if ($currentPhase) {
		if ($currentPhase === "Transition") {
			effects.forEach((effect) => effect.disconnect());
			mic.volume.linearRampTo(-Infinity, 3);
		} else if ($currentPhase.includes("Flutters")) {
			delay.delayTime.value = 0.5;
			mic.connect(delay);
			delay.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		} else if ($currentPhase === "Noisy Birds") {
			mic.connect(crusher);
			crusher.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		} else if ($currentPhase === "Underwater") {
			delay.delayTime.value = 0.1;
			mic.connect(underwater);
			underwater.connect(vibrato);
			vibrato.connect(delay);
			delay.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		} else if ($currentPhase === "Subterranean") {
			delay.delayTime.value = 0.1;
			mic.connect(subterranean);
			subterranean.connect(delay);
			delay.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		} else if ($currentPhase === "Explosive!") {
			mic.connect(explosive);
			explosive.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		} else if ($currentPhase === "Low Energy") {
			mic.connect(lowEnergy);
			lowEnergy.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		} else {
			mic.connect(convolver);
			mic.volume.linearRampTo(0, 3);
		}
	}
</script>

{#if $audioStarted && $buffersLoaded}
	<button class="border-0 px-3 py-1 {$nightMode ? 'bg-white text-dark' : 'bg-dark text-light'}" onclick={startPiece}>Start</button>
{:else if !audioReady}
	<button class="border-0 px-3 py-1 {$nightMode ? 'bg-light text-dark' : 'bg-dark text-light'}" onclick={startAudio}>Start Audio</button>
{/if}

<style>
	button {
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
