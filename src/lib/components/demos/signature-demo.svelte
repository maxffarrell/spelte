<script lang="ts">
	import { onMount } from 'svelte';

	let svgEl: SVGSVGElement;
	let paths: SVGPathElement[] = [];

	const text = 'Spelte';

	onMount(() => {
		paths = Array.from(svgEl.querySelectorAll('path'));
		paths.forEach((path) => {
			const len = path.getTotalLength();
			path.style.strokeDasharray = String(len);
			path.style.strokeDashoffset = String(len);
			path.style.animation = 'draw-sig 1.8s ease forwards';
			path.style.animationDelay = '0.3s';
		});
	});
</script>

<div class="flex items-center justify-center dark:invert">
	<svg
		bind:this={svgEl}
		viewBox="0 0 200 60"
		xmlns="http://www.w3.org/2000/svg"
		class="w-48 h-14"
		fill="none"
		stroke="#1D1D1F"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<!-- Stylized "Spelte" signature paths -->
		<path d="M15,42 C12,35 10,28 14,22 C18,16 26,18 24,26 C22,32 14,34 16,40 C18,46 28,44 30,38" />
		<path d="M35,20 C35,20 33,32 34,40 M33,28 C36,26 41,24 43,27 C45,30 43,34 39,35 C36,36 34,38 36,42" />
		<path d="M50,18 L50,42 M48,30 L56,30" />
		<path d="M62,24 C60,28 59,34 60,38 C61,42 65,44 68,41 C72,37 72,30 70,26 C68,22 63,22 61,26" />
		<path d="M78,18 L78,42 M78,30 C81,27 85,26 87,28 C89,30 89,34 87,37 C85,40 78,42 78,42" />
		<path d="M95,24 C93,30 93,38 97,42 C100,45 104,43 106,40 C108,36 107,30 105,26 C103,22 98,21 95,24 Z" />
	</svg>
</div>

<style>
	@keyframes draw-sig {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
