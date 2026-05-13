<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Align = 'left' | 'center' | 'right';

	interface Props {
		children?: Snippet;
		align?: Align;
		class?: string;
		speed?: number;
		paused?: boolean;
		delay?: number;
		repeat?: boolean;
		inViewProp?: boolean;
		once?: boolean;
		radial?: boolean;
		bottomOffset?: number;
		bandGap?: number;
		bandCount?: number;
		customColors?: string[];
		ariaLabel?: string;
		onclick?: (e: MouseEvent) => void;
		onmouseenter?: (e: MouseEvent) => void;
		onmouseleave?: (e: MouseEvent) => void;
	}

	const defaultColors = ['#8d6869', '#5a8ea6', '#b9c96e', '#c7c571', '#cb706f', '#7e5e5f'];

	let {
		children,
		align = 'center',
		class: className,
		speed = 1,
		paused = false,
		delay = 0,
		repeat = false,
		inViewProp = false,
		once = true,
		radial = true,
		bottomOffset = 20,
		bandGap = 4,
		bandCount = 8,
		customColors,
		ariaLabel,
		onclick,
		onmouseenter,
		onmouseleave
	}: Props = $props();

	let elRef = $state<HTMLDivElement | null>(null);
	let rafId = 0;
	let t = -25;
	let cyclesDone = 0;
	let finished = false;
	let started = false;
	let startAt = 0;
	let hasPlayed = false;
	let isInView = $state(!inViewProp);

	const cycles = $derived(repeat ? 0 : 1);
	const resolvedColors = $derived(customColors?.length ? customColors : defaultColors);

	const stops = $derived.by(() => {
		const baseColor = 'var(--gradient-wave-base, rgb(29,29,31))';
		const arr: string[] = [];
		arr.push(`${baseColor} calc((var(--gi) + 0) * 1%)`);
		for (let i = 0; i < bandCount && i < resolvedColors.length * 2; i++) {
			const color = resolvedColors[i % resolvedColors.length];
			const offset = (i + 2) * bandGap;
			arr.push(`${color} calc((var(--gi) + ${offset}) * 1%)`);
		}
		const endOffset = (bandCount + 2) * bandGap;
		arr.push(`${baseColor} calc((var(--gi) + ${endOffset}) * 1%)`);
		return arr.join(', ');
	});

	const gradient = $derived(
		radial
			? `radial-gradient(circle at 50% bottom, ${stops})`
			: `linear-gradient(0deg, ${stops})`
	);

	const justifyContent = $derived(
		align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'
	);

	$effect(() => {
		const node = elRef;
		if (node) node.style.setProperty('--gi', '-25');
	});

	$effect(() => {
		if (!elRef || !isInView) return;
		t = -25;
		cyclesDone = 0;
		finished = false;
		started = false;
		startAt = performance.now() + Math.max(0, delay * 1000);
		elRef.style.setProperty('--gi', '-25');
	});

	$effect(() => {
		const node = elRef;
		if (!node || !isInView) return;

		const RANGE = 200;
		let last = performance.now();

		function tick(now: number) {
			if (finished) return;
			if (!started) {
				if (now >= startAt) { started = true; last = now; }
				else { rafId = requestAnimationFrame(tick); return; }
			}
			const dt = Math.min(64, now - last);
			last = now;
			if (!paused) {
				const increment = (dt * speed) / 16.6667;
				let next = t + increment;
				if (cycles === 0) {
					if (next >= RANGE) next = next % RANGE;
					t = next;
					node.style.setProperty('--gi', String(next));
				} else {
					while (next >= RANGE && cyclesDone < cycles) { next -= RANGE; cyclesDone++; }
					if (cyclesDone >= cycles) {
						t = RANGE;
						node.style.setProperty('--gi', String(RANGE));
						finished = true;
						return;
					} else {
						t = next;
						node.style.setProperty('--gi', String(next));
					}
				}
			}
			rafId = requestAnimationFrame(tick);
		}

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	});

	$effect(() => {
		if (!inViewProp || !elRef) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (once && hasPlayed) return;
					isInView = true;
					hasPlayed = true;
				} else if (!once) {
					isInView = false;
				}
			});
		}, { threshold: 0.1 });
		observer.observe(elRef);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={elRef}
	class={cn(
		'flex w-full h-full items-center [--gradient-wave-base:rgb(29,29,31)] dark:[--gradient-wave-base:rgb(255,255,255)]',
		className
	)}
	style="justify-content: {justifyContent}; --gi: -25"
	aria-label={ariaLabel || undefined}
	role={ariaLabel ? 'img' : undefined}
	{onclick}
	{onmouseenter}
	{onmouseleave}
>
	<span
		style="
			text-align: {align};
			background-image: {gradient};
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
			color: transparent;
			white-space: pre-wrap;
			word-break: break-word;
			display: inline-block;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
			transform: translateZ(0);
			padding-bottom: {bottomOffset}%;
			margin-bottom: -{bottomOffset}%;
			padding-inline: 2px;
		"
	>
		{#if children}{@render children()}{/if}
	</span>
</div>
