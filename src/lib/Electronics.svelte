<script>
	import { audioStarted, pieceStarted, buffersLoaded, micVolume } from "$lib/stores.js";
	import * as Tone from "tone";

	let volume, buffers;

	function random(min, max) {
		return Math.random() * (max - min) + min;
	}

	function loopDrone() {
		const buffer = buffers.get("drone");
		const player = new Tone.Player(buffer).connect(volume);
		player.buffer = buffer;
		player.fadeIn = 1;
		player.fadeOut = 0.05;
		player.playbackRate = random(0.5, 2.25);
		player.start();

		const loopEnd = (buffer.duration * 1000 * random(0.7, 0.75)) / player.playbackRate;
		let counter = 0;
		const time = setInterval(() => {
			counter += 50;

			if (counter >= loopEnd) {
				clearInterval(time);
				loopDrone();
			}
		}, 50);
	}

	function incidentals() {
		const convolver = new Tone.Convolver("/1st_baptist_nashville_balcony.wav");
		const burstSampler = new Tone.Sampler({
			E4: buffers.get("burst1"),
			C4: buffers.get("burst2"),
			A3: buffers.get("burst3"),
			F3: buffers.get("burst4"),
			D3: buffers.get("burst5"),
			Bb2: buffers.get("burst6"),
		});
		let burstCooldown = true;

		function bursts() {
			const delay = new Tone.FeedbackDelay(random(0.4, 0.5), random(0.6, 0.7));
			burstSampler.chain(delay, convolver, volume, Tone.getDestination());

			if (Math.random() >= 0.9) {
				burstSampler.triggerAttackRelease(random(116, 330), random(0.1, 0.25));

				if (burstCooldown) {
					burstCooldown = false;
					setTimeout(() => {
						burstCooldown = true;
					}, 250);
				}
			}
		}

		if (burstCooldown) bursts();
	}

	$: if ($audioStarted) {
		volume = new Tone.Volume(0).toDestination();
		buffers = new Tone.ToneAudioBuffers(
			{
				drone: "/drone-1.mp3",
				burst1: "/burst-1.mp3",
				burst2: "/burst-2.mp3",
				burst3: "/burst-3.mp3",
				burst4: "/burst-4.mp3",
				burst5: "/burst-5.mp3",
				burst6: "/burst-6.mp3",
			},
			() => {
				$buffersLoaded = true;
			}
		);
	}

	$: if ($pieceStarted) {
		loopDrone();
	}

	$: if ($micVolume && $micVolume > -15) {
		incidentals();
	}
</script>
