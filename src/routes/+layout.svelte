<script>
	import "bootstrap/dist/css/bootstrap.min.css";
	import "bootstrap-icons/font/bootstrap-icons.min.css";
	import "../app.css";
	import { nightMode } from "$lib/stores.js";
</script>

<nav class="d-flex align-items-center justify-content-between p-4 {$nightMode ? 'bg-dark' : 'bg-light'}">
	<a class="fs-2 text-decoration-none {$nightMode ? 'text-light' : 'text-dark'}" href="https://forrestbalman.com">Forrest</a>
	<div class="d-flex align-items-center gap-3">
		<a href="/" class="text-decoration-none {$nightMode ? 'text-light' : 'text-dark'}">Home</a>
		<a href="/about" class="text-decoration-none {$nightMode ? 'text-light' : 'text-dark'}">About</a>
		<button aria-label="night or day mode" class="rounded-5 border-0 position-relative" style="background: {$nightMode ? '#f3f3f3' : '#333'}" onclick="{() => ($nightMode = !$nightMode)}">
			<i
				class="bi position-absolute top-50 translate-middle-y mx-2
            {$nightMode ? 'bi-moon-stars text-black' : 'bi-brightness-high text-white'}"
				style="right: {$nightMode ? '32px' : '0'};"></i>
		</button>
	</div>
</nav>
<slot></slot>

<style>
	button {
		width: 64px;
		height: 32px;
	}

	* {
		font-family: "Poppins", sans-serif;
		transition: all 300ms cubic-bezier(0.5, 1, 0.89, 1);
	}
</style>
