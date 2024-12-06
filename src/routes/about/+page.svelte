<script>
	import { nightMode } from "$lib/stores.js";
</script>

<main class="min-vh-100 d-flex flex-column gap-5 py-3 {$nightMode ? 'bg-dark' : 'bg-light'}">
	<h1 class="text-center {$nightMode ? 'text-white' : 'text-dark'}">
		<i class="bi bi-circle-half"></i> One can only try to be like you
		<i class="bi bi-circle-half d-inline-block"></i>
	</h1>
	<section class="container {$nightMode ? 'text-white' : 'text-dark'}">
		<!-- General info about the piece -->
		<div class="mb-5">
			<h2 class="text-decoration-underline">About the piece</h2>
			<div>
				<p>
					<i class="bi bi-circle-half"></i> One can only try to be like you
					<i class="bi bi-circle-half d-inline-block"></i> is a piece for two trombones and electronics inspired by a theater game that's common in drama classes/clubs called "Mirroring". In a pair of participants, one person takes the lead, while the other mimics what the leader is doing, as if they are looking
					in a mirror.
				</p>
				<div class="embed-container">
					<iframe src="https://www.youtube.com/embed/L2dGy3tXlCc" title="Mirroring game example" frameborder="0" allowfullscreen></iframe>
				</div>
				<p class="mt-3">The piece aims to take advantage of the trombone's unique physicality by having participants position their slides in the negative space left by their partner.</p>
			</div>
		</div>
		<!-- About performing the piece -->
		<div class="mb-5">
			<h2 class="text-decoration-underline">Performing</h2>
			<div class="mb-4">
				<h4>Materials</h4>
				<p>For a concert performance of this piece, here's a list of required materials:</p>
				<ul>
					<li>A computer with the ability to mirror the score to two separate screens.</li>
					<li>An audio interface with 2 inputs. The score will mix all incoming channels into 1 signal for processing.</li>
					<li>A microphone for each performer. I envision this as a clip on microphone attached to the bell of each participant, but if a bi-directional microphone is more appropriate for your situation, that's a perfectly fine option.</li>
				</ul>
			</div>
			<div class="mb-4">
				<h4>Positioning</h4>
				<p>
					Start with each player positioning far enough away such that a fully extended slide leaves <span class="fst-italic">no more than a foot</span>
					until it would hit the other player's face.
					<span class="text-warning">The piece is supposed to be intimate, so the closer the players can be, the better.</span>
				</p>
			</div>
			<div>
				<h4>Setting up Electronics + Starting the Piece</h4>
				<p>
					To run the piece you're going to need <span class="text-warning">an IDE, like <a href="https://code.visualstudio.com/download">VSCode</a>, a version of <a href="https://nodejs.org/en">NodeJS</a>, and a copy of <a href="https://cycling74.com/downloads">Max MSP</a> for all processing and electronic
					accompaniment.</span> A free version of Max is fine.
				</p>
				<ol>
					<li>Download a local copy of the score from the <a href="/">GitHub</a> repository. It will contain the score and Max patch</li>
				</ol>
			</div>
		</div>
		<!-- About the score -->
		<div class="mb-5">
			<h2 class="text-decoration-underline">Score</h2>
			<video class="w-100" src="/loop.mp4" muted autoplay loop></video>
			<div class="mb-4">
				<h4>Overview</h4>
				<p>
					The score is designed to be an intuitive tablature that indicates: slide position, volume, duration, articulation, and accessory. Keep in mind that, sometimes, you might be moving the slide without blowing into the instrument, and that both sets of animated instructions are independent of one
					another. The piece is more about the physicality of the trombone, and the symmetry created by the two performers facing one another.
				</p>
			</div>
			<div class="mb-4">
				<h4>Sliders</h4>
				<p>
					There are left and right (or <span class="text-primary">blue</span>
					and <span class="text-danger">red</span>) sliders. This is the approximate length of your slide at any given time.
				</p>
			</div>
			<div class="mb-4">
				<h4>Tick mark</h4>
				<p>
					This tick mark will move to the end-point of the next slide before it happens. This is only for visual clarity. <span class="text-warning">You don't move when the tick mark moves. Only when the sliders move.</span>
				</p>
			</div>
			<div class="mb-4">
				<h4>Countdown timer</h4>
				<p>This will count you down to the next movement. This will happen in three different ways during the piece:</p>
				<ol>
					<li>At the beginning of the piece - 10 seconds</li>
					<li>Throughout the piece at various points - 10 seconds</li>
				</ol>
				<p>The tick mark will move after the countdown timer reaches 0.</p>
			</div>
			<div class="mb-4">
				<h4>"Trombone" Roll</h4>
				<p>
					This piano roll inspired interface tells you how long to play for. The wedge will move across the screen, and you sustain it for as long as it's in the "end zone". <span class="text-warning"
						>You can configure the "trombone" roll to scroll from right to left or left to right based on your preferences by toggling the preference.</span>
				</p>
				<p>The height of the wedge tells you the volume of what you're playing. I.e. a very narrow wedge will tell you to play very quietly, and a wedge that's the entire height of the "trombone" roll tells you to play as loud as comfortable.</p>
			</div>

			<div class="mb-4">
				<h4>Phase and accessories</h4>
				<p>
					The text in the upper left corner of the score tells your the <span class="fst-italic">phase</span> of the piece, which is the term I'm using to refer to thematic sections of the piece. They describe the general mood and what the electronics are doing.
				</p>
				<p>Occasionally, the phase will have an icon to the left of it that will indicate the use of a mute/accessory. (List to be added at a later point)</p>
			</div>
		</div>
	</section>
</main>

<style>
	main {
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}

	.container {
		max-width: 900px;
	}

	.bi-circle-half.d-inline-block {
		transform: scaleX(-1);
	}

	.embed-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		max-width: 100%;
	}

	.embed-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
