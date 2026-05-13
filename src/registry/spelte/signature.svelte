<script lang="ts">
	import { cn } from '$lib/utils';
	import { animate, inView } from 'motion';
	import opentype from 'opentype.js';

	interface Props {
		text?: string;
		color?: string;
		fontSize?: number;
		duration?: number;
		delay?: number;
		class?: string;
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
		inViewProp = false,
		once = true
	}: Props = $props();

	const height = 100;
	const horizontalPadding = $derived(fontSize * 0.1);
	const topMargin = $derived(Math.max(5, (height - fontSize) / 2));
	const baseline = $derived(Math.min(height - 5, topMargin + fontSize));
	const maskId = `signature-reveal-${Math.random().toString(36).slice(2)}`;

	let paths = $state<string[]>([]);
	let svgWidth = $state(300);
	let svgEl = $state<SVGSVGElement | null>(null);
	let pathEls: SVGPathElement[] = [];
	let maskPathEls: SVGPathElement[] = [];

	function registerPath(el: SVGPathElement) {
		pathEls.push(el);
		return { destroy() { pathEls = pathEls.filter((e) => e !== el); } };
	}

	function registerMaskPath(el: SVGPathElement) {
		maskPathEls.push(el);
		return { destroy() { maskPathEls = maskPathEls.filter((e) => e !== el); } };
	}

	$effect(() => {
		async function load() {
			try {
				let font;
				for (const path of ['/LastoriaBoldRegular.otf', `${window.location.origin}/LastoriaBoldRegular.otf`]) {
					try { font = await opentype.load(path); break; } catch {}
				}
				if (!font) throw new Error('Font not found');

				let x = horizontalPadding;
				const newPaths: string[] = [];
				for (const char of text) {
					const glyph = font.charToGlyph(char);
					const p = glyph.getPath(x, baseline, fontSize);
					newPaths.push(p.toPathData(3));
					const aw = glyph.advanceWidth ?? font.unitsPerEm;
					x += aw * (fontSize / font.unitsPerEm);
				}
				paths = newPaths;
				svgWidth = x + horizontalPadding;
			} catch {
				paths = [];
				svgWidth = text.length * fontSize * 0.6;
			}
		}
		load();
	});

	function runAnimation() {
		const allPaths = [...pathEls, ...maskPathEls];
		allPaths.forEach((el, i) => {
			const idx = i % paths.length;
			animate(el, { pathLength: [0, 1], opacity: [0, 1] }, {
				pathLength: { delay: delay + idx * 0.2, duration, ease: 'easeInOut' },
				opacity: { delay: delay + idx * 0.2 + 0.01, duration: 0.01 }
			});
		});
	}

	$effect(() => {
		if (!svgEl || paths.length === 0) return;
		if (inViewProp) {
			const cleanup = inView(svgEl, () => {
				runAnimation();
				if (once) return () => {};
			});
			return cleanup as () => void;
		} else {
			runAnimation();
		}
	});
</script>

{#if paths.length > 0}
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
						style="pathLength: 0; opacity: 0;"
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
				style="pathLength: 0; opacity: 0;"
			/>
		{/each}
		<g mask="url(#{maskId})">
			{#each paths as d}
				<path {d} fill={color} />
			{/each}
		</g>
	</svg>
{/if}
