<script>
	import PhaseDisplay from "$lib/PhaseDisplay.svelte";
	import Slider from "$lib/Slider.svelte";
	import TromboneRoll from "$lib/TromboneRoll.svelte";
	import ArticulationLane from "$lib/ArticulationLane.svelte";
	import { nightMode, elementOpacities, phases, currentPhase, pieceStarted } from "$lib/stores.js";
	import { tweened } from "svelte/motion";

	let nextWidth = 50;
	let moveCounter = 0;
	let countdownStart = 10;
	let phaseNameDisplay;
	let tromboneRollWidth;
	let phase;
	const leftSliderWidth = tweened(nextWidth);

	function startPiece() {
		// scrolls the piece into view, hiding the navbar
		document.getElementById("score").scrollIntoView({
			behavior: "smooth",
		});

		// makes start button invisible and not interactive
		setTimeout(() => {
			generatePhase();
			$elementOpacities.startHeader = 0;
			$elementOpacities.score = 100;
			$elementOpacities.phaseName = 100;
		}, 1000);

		// makes the score visible
		// starts the countdown timer
		// once countdown reaches 0, clears countdown, and calls the slider moving function
		setTimeout(() => {
			moveCounter = countdownStart;
			const countdownTimer = setInterval(() => {
				moveCounter--;
				if (moveCounter === 0) {
					clearInterval(countdownTimer);
					moveLeftSlider();
					moveWedges();
				}
			}, 1000);
		}, 3000);
	}

	// generate a random number between 15 and 90, making sure that the new number is at least 15 away from the previous number
	function getRandomWidth() {
		let newWidth = Math.floor(Math.random() * 76) + 15;

		if (Math.abs(newWidth - nextWidth) < 15) {
			newWidth = getRandomWidth();
		}

		return newWidth;
	}

	function moveLeftSlider() {
		// gets a new width
		nextWidth = getRandomWidth();

		// a random duration between 3 and 6 seconds
		const randomDuration = Math.random() * 6000 + 3000;

		// sets the slider width store/tween to the new width/duration
		// the tick mark will move immediately since it's bound to nextWidth, but the slider store/tween will start 2 seconds later
		setTimeout(() => {
			leftSliderWidth.set(nextWidth, {
				duration: randomDuration,
			});
		}, 2000);

		// 30% likelihood of starting the countdown/slider moving sequence again after the slider finishes moving
		setTimeout(() => {
			const nextMoveCountdown = setInterval(() => {
				const random = Math.random();

				if (random <= 0.3) {
					clearInterval(nextMoveCountdown);
					moveCounter = countdownStart;
					const countdownTimer = setInterval(() => {
						moveCounter--;
						if (moveCounter === 0) {
							clearInterval(countdownTimer);
							moveLeftSlider();
						}
					}, 1000);
				}
			}, 1000);
		}, randomDuration + 3000);
	}

	// selects a phase
	function generatePhase() {
		// phase information that will inform the phase object that will be used for displaying information in the score
		const p = pickRandomPhase();

		let phaseLength = generatePhaseLength();
		let phaseWedges = generateWedges();
		let phaseArticulations = generateArticulationBreakdown();
		let activeArticulations = generateActiveArticulations();
		let mute = p.mute || false;

		// picks a phase at random from the store
		function pickRandomPhase() {
			const keys = Object.keys($phases);
			const randomKey = keys[Math.floor(Math.random() * keys.length)];
			return $phases[randomKey];
		}

		// generates a length for the phase based on the specified range, which is an array with a min/max value
		function generatePhaseLength() {
			return Math.floor(Math.random() * (Math.max(...p.length) - Math.min(...p.length) + 1)) + Math.min(...p.length);
		}

		// generates all wedges in advance
		function generateWedges() {
			let wedges = [];

			// for determining the likelihood of a value within a range
			// pushes a value to an array a number of times, then the array will have a random index selected to determine the value
			// i.e. when determining length, if the array has 90 instances of "short", 5 instances of "medium", and 5 instances of "long", when selecting an index a random, short will be picked 90% of the time, and medium/long will be selected 5% of the time each
			function generateLikelihood(c, a, v) {
				for (let i = 0; i < c; i++) {
					a.push(v);
				}
			}

			// for the duration of the note, in % relative to the score's width
			function wedgeLength() {
				let likelihoods = [];
				let random = Math.random();
				let length;

				generateLikelihood(p.durations.short, likelihoods, "short");
				generateLikelihood(p.durations.medium, likelihoods, "medium");
				generateLikelihood(p.durations.long, likelihoods, "long");

				length = likelihoods[Math.floor(Math.random() * likelihoods.length)];

				if (length === "short") {
					if (random <= 1 / 3) return 3;
					else if (random > 1 / 3 && random <= 2 / 3) return 5;
					else return 7;
				} else if (length === "medium") {
					if (random <= 1 / 3) return 25;
					else if (random > 1 / 3 && random <= 2 / 3) return 35;
					else return 40;
				} else {
					if (random <= 1 / 3) return 80;
					else if (random > 1 / 3 && random <= 2 / 3) return 90;
					else return 100;
				}
			}

			// for the volume of the note, in pixels
			function wedgeHeight() {
				let likelihoods = [];
				let random = Math.random();
				let height;

				generateLikelihood(p.volumes.soft, likelihoods, "soft");
				generateLikelihood(p.volumes.medium, likelihoods, "medium");
				generateLikelihood(p.volumes.loud, likelihoods, "loud");

				height = likelihoods[Math.floor(Math.random() * likelihoods.length)];

				if (height === "soft") {
					if (random <= 1 / 3) return 5;
					else if (random > 1 / 3 && random <= 2 / 3) return 10;
					else return 15;
				} else if (height === "medium") {
					if (random <= 1 / 3) return 30;
					else if (random > 1 / 3 && random <= 2 / 3) return 40;
					else return 50;
				} else {
					if (height <= 1 / 3) return 80;
					else if (random > 1 / 3 && random <= 2 / 3) return 90;
					else return 100;
				}
			}

			function wedgeCrescendo(height, length) {
				const random = Math.random();
				if (random <= 0.3 && height >= 30 && length >= 25) {
					//random number between 50 and 80
					const crescendoStart = Math.floor(Math.random() * 31) + 50;
					if (Math.random() >= 0.5) {
						return `polygon(0 0, 100% ${100 - crescendoStart}%, 100% ${crescendoStart}%, 0 100%)`;
					} else {
						return `polygon(0 ${100 - crescendoStart}%, 100% 0, 100% 100%, 0 ${crescendoStart}%)`;
					}
				} else {
					return false;
				}
			}

			// for the delay following the note, in %
			function wedgeDelay() {
				return Math.floor(Math.random() * (Math.max(...p.delay) - Math.min(...p.delay) + 1)) + Math.min(...p.delay);
			}

			// the initial position for each wedge is going to start at 100%, or just off-screen
			let currentPosition = 100;

			// generate wedges such that each wedge has width, height, and delay
			// update each wedge's position to account for the delay behind the previous wedge
			for (let i = 0; i < phaseLength; i++) {
				const length = wedgeLength();
				const height = wedgeHeight();
				const delay = wedgeDelay();
				const position = currentPosition;
				const crescendo = wedgeCrescendo(height, length);

				currentPosition = position + length + delay;

				wedges = [
					...wedges,
					{
						position: position,
						length: length,
						height: height,
						delay: delay,
						crescendo: crescendo,
						passed: false,
						visible: false,
					},
				];
			}

			return wedges;
		}

		function generateArticulationBreakdown() {
			const articulations = p.articulations;
			const articulationBreakdown = [];

			for (const articulation in articulations) {
				articulationBreakdown.push([articulation, articulations[articulation]]);
			}

			for (let i = 0; i < articulationBreakdown.length; i++) {
				articulationBreakdown[i] = [articulationBreakdown[i][0], Math.floor(phaseLength * (articulationBreakdown[i][1] / 100))];
			}

			return articulationBreakdown;
		}

		function generateActiveArticulations() {
			const articulations = phaseArticulations;
			const activeArticulations = [];

			for (let i = 0; i < articulations.length; i++) {
				activeArticulations.push({
					name: articulations[i][0],
					position: phaseWedges[articulations[i][1]].position,
					passed: false,
				});
			}

			return activeArticulations;
		}

		// set phase to have a name, number of wedges, and an array that keeps track of wedge information
		phase = {
			name: Object.keys($phases).find((k) => $phases[k] === p),
			length: phaseLength,
			wedges: phaseWedges,
			articulations: phaseArticulations,
			activeArticulations: activeArticulations,
			mute,
		};

		phaseNameDisplay = phase.name;

		if (!$currentPhase) {
			$currentPhase = phase.name;
		}

		// makes the phase name visible after the phase has been generated
		$elementOpacities.phaseName = 100;

		console.log(phase);
	}

	// for moving wedges across the screen
	function moveWedges() {
		// used for making the animation consistent across refresh rates
		let previousTimestamp = 0;

		// generates a 5 - 10 second delay between phases
		function generateDelayBetweenPhases() {
			return Math.floor(Math.random() * 6) + 5;
		}

		// animating the wedges
		// uses a timestamp to compare frames for consistency across refresh rates
		function step(timestamp) {
			if (!previousTimestamp) previousTimestamp = timestamp;

			const deltaTime = timestamp - previousTimestamp;
			previousTimestamp = timestamp;

			// each wedge travels 20% of the trombone roll per second
			const distancePerSecond = 20;
			const distancePerFrame = (distancePerSecond / 1000) * deltaTime;

			// if the phase has a wedges array, move the wedge by subtracting from its current position
			// set the "passed" property to true if it has traveled the entire length of the trombone roll
			if (phase.wedges) {
				phase.wedges.forEach((w) => {
					w.position -= distancePerFrame;

					if (w.position >= -w.length && w.position <= 100) {
						w.visible = true;
					} else {
						w.visible = false;
					}

					if (w.position <= -w.length) {
						w.passed = true;
					}

					phase.wedges = [...phase.wedges];
				});

				phase.activeArticulations.forEach((a, i) => {
					a.position -= distancePerFrame;

					if (a.position <= -30) {
						a.passed = true;
					}

					if (i < phase.activeArticulations.length - 1) {
						if (phase.wedges[phase.articulations[i][1]].position <= 0 && phase.wedges[phase.articulations[i + 1][1]].position >= 30) {
							phase.activeArticulations[i].position = 0;
						}
					} else {
						if (phase.wedges[phase.articulations[i][1]].position <= 0 && !phase.wedges[phase.wedges.length - 1].passed) {
							phase.activeArticulations[i].position = 0;
						}
					}

					phase.activeArticulations = [...phase.activeArticulations];
				});
			}

			// if there are still wedges that need to move, keep animating, otherwise, start the process of generating another phase
			if (phase.wedges.filter((w) => w.passed).length < phase.wedges.length && phase.activeArticulations.filter((a) => a.passed).length < phase.activeArticulations.length) {
				requestAnimationFrame(step);
			} else {
				// hide the phase name
				// after 1s generate a new phase, change the phase name to a countdown
				// check to see if phase name is a number, then show the phase name
				// start the countdown timer
				// when countdown reaches 0, hide the phase name
				// 1s later, change the phase name to the name property of phase and move the wedges
				$elementOpacities.phaseName = 0;
				setTimeout(() => {
					generatePhase();
					let nextPhaseCountdown = generateDelayBetweenPhases();
					phaseNameDisplay = nextPhaseCountdown;
					$currentPhase = "Transition";
					const checkPhaseNameIsNumber = setInterval(() => {
						if (!isNaN(phaseNameDisplay)) {
							clearInterval(checkPhaseNameIsNumber);
							$elementOpacities.phaseName = 100;

							const nextPhaseCountdownTimer = setInterval(() => {
								nextPhaseCountdown--;
								phaseNameDisplay = nextPhaseCountdown;
								if (nextPhaseCountdown === 0) {
									clearInterval(nextPhaseCountdownTimer);
									$elementOpacities.phaseName = 0;
									$currentPhase = phase.name;

									setTimeout(() => {
										phaseNameDisplay = phase.name;

										const checkPhaseNameIsString = setInterval(() => {
											if (isNaN(phaseNameDisplay)) {
												clearInterval(checkPhaseNameIsString);
												$elementOpacities.phaseName = 100;
												moveWedges();
											}
										});
									}, 1000);
								}
							}, 1000);
						}
					}, 10);
				}, 1000);
			}
		}

		requestAnimationFrame(step);
	}

	$: if ($pieceStarted) startPiece();
</script>

<div id="score" class="container flex-grow-1 d-flex flex-column gap-2 justify-content-center align-items-center user-select-none" style="opacity: {$elementOpacities.score}%;">
	<PhaseDisplay {phase} {phaseNameDisplay} {moveCounter} />
	<Slider {leftSliderWidth} {nextWidth} />
	<TromboneRoll {phase} {tromboneRollWidth} />
	<ArticulationLane {phase} />
</div>

<style>
	div {
		transition:
			background 300ms cubic-bezier(0.5, 1, 0.89, 1),
			border 300ms cubic-bezier(0.5, 1, 0.89, 1),
			opacity 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
