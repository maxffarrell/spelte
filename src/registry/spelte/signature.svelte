<script lang="ts">
	import { tick } from 'svelte';
	import { animate, inView as motionInView } from 'motion-sv';
	import opentype from 'opentype.js';
	import { lastoriaBoldRegularBase64 } from '$lib/assets/lastoria-bold-regular';
	import { cn } from '$lib/utils';

	interface Props {
		text?: string;
		color?: string;
		fontSize?: number;
		duration?: number;
		delay?: number;
		class?: string;
		inView?: boolean;
		inViewProp?: boolean;
		once?: boolean;
	}

	let {
		text = 'Signature',
		color = '#000',
		fontSize = 14,
		duration = 1.5,
		delay = 0,
		class: className,
		inView = false,
		inViewProp,
		once = true
	}: Props = $props();

	const height = 100;
	const horizontalPadding = $derived(fontSize * 0.1);
	const topMargin = $derived(Math.max(5, (height - fontSize) / 2));
	const baseline = $derived(Math.min(height - 5, topMargin + fontSize));
	const shouldAnimateInView = $derived(inViewProp ?? inView);
	const maskId = `signature-reveal-${Math.random().toString(36).slice(2)}`;

	let paths = $state<string[]>([]);
	let svgWidth = $state(300);
	let svgEl: SVGSVGElement | undefined = $state();
	let animationRun = 0;
	let cleanupInView: (() => void) | undefined;
	let pathEls: SVGPathElement[] = [];
	let maskPathEls: SVGPathElement[] = [];

	function registerPath(el: SVGPathElement) {
		pathEls.push(el);
		return {
			destroy() {
				pathEls = pathEls.filter((pathEl) => pathEl !== el);
			}
		};
	}

	function registerMaskPath(el: SVGPathElement) {
		maskPathEls.push(el);
		return {
			destroy() {
				maskPathEls = maskPathEls.filter((pathEl) => pathEl !== el);
			}
		};
	}

	$effect(() => {
		let cancelled = false;

		async function load() {
			try {
				let font: opentype.Font | undefined;
				const fontPaths = [
					'/LastoriaBoldRegular.otf',
					'./LastoriaBoldRegular.otf',
					`${window.location.origin}/LastoriaBoldRegular.otf`
				];

				for (const path of fontPaths) {
					try {
						font = await opentype.load(path);
						break;
					} catch {
						// Try the next path, matching the upstream component.
					}
				}

				if (!font) {
					const binary = atob(lastoriaBoldRegularBase64);
					const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
					font = opentype.parse(bytes.buffer);
				}

				if (!font) throw new Error('Font could not be loaded from any path');

				let x = horizontalPadding;
				const nextPaths: string[] = [];

				for (const char of text) {
					const glyph = font.charToGlyph(char);
					const path = glyph.getPath(x, baseline, fontSize);
					nextPaths.push(path.toPathData(3));

					const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
					x += advanceWidth * (fontSize / font.unitsPerEm);
				}

				if (cancelled) return;
				pathEls = [];
				maskPathEls = [];
				paths = nextPaths;
				svgWidth = x + horizontalPadding;
			} catch {
				if (cancelled) return;
				pathEls = [];
				maskPathEls = [];
				paths = [];
				svgWidth = text.length * fontSize * 0.6;
			}
		}

		load();

		return () => {
			cancelled = true;
		};
	});

	function preparePath(el: SVGPathElement) {
		const length = el.getTotalLength();
		el.style.strokeDasharray = `${length}`;
		el.style.strokeDashoffset = `${length}`;
		el.style.opacity = '0';
	}

	function runAnimation() {
		const run = ++animationRun;
		const animatedPaths = [...maskPathEls, ...pathEls];

		for (const [i, el] of animatedPaths.entries()) {
			const idx = i % Math.max(paths.length, 1);
			preparePath(el);

			const length = el.getTotalLength();
			const controls = animate(
				el,
				{ strokeDashoffset: [length, 0], opacity: [0, 1] },
				{
					delay: delay + idx * 0.2,
					duration,
					ease: 'easeInOut',
					opacity: {
						delay: delay + idx * 0.2 + 0.01,
						duration: 0.01
					}
				}
			);

			controls.finished.catch(() => {});
			controls.finished.then(() => {
				if (run !== animationRun) return;
				el.style.strokeDashoffset = '0';
				el.style.opacity = '1';
			});
		}
	}

	$effect(() => {
		if (!svgEl || paths.length === 0) return;

		cleanupInView?.();
		cleanupInView = undefined;

		tick().then(() => {
			if (!svgEl || paths.length === 0) return;

			if (shouldAnimateInView) {
				cleanupInView = motionInView(svgEl, () => {
					runAnimation();
					if (once) return () => {};
				});
			} else {
				runAnimation();
			}
		});

		return () => {
			cleanupInView?.();
			cleanupInView = undefined;
		};
	});
</script>

<svg
	bind:this={svgEl}
	width={svgWidth}
	height={height}
	viewBox="0 0 {svgWidth} {height}"
	fill="none"
	class={cn(className)}
>
	<defs>
		<mask id={maskId} maskUnits="userSpaceOnUse">
			{#each paths as d, i}
				<path
					use:registerMaskPath
					{d}
					stroke="white"
					stroke-width={fontSize * 0.22}
					fill="none"
					vector-effect="non-scaling-stroke"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			{/each}
		</mask>
	</defs>

	{#each paths as d, i}
		<path
			use:registerPath
			{d}
			stroke={color}
			stroke-width="2"
			fill="none"
			vector-effect="non-scaling-stroke"
			stroke-linecap="butt"
			stroke-linejoin="round"
		/>
	{/each}

	<g mask="url(#{maskId})">
		{#each paths as d, i}
			<path {d} fill={color} />
		{/each}
	</g>
</svg>
