<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	let {
		text,
		class: className,
		delay = 0,
		speedReveal = 1.5,
		speedSegment = 0.5,
		trigger = true,
		letterSpacing,
		as: Tag = 'p',
		style,
	}: {
		text: string;
		class?: string;
		delay?: number;
		speedReveal?: number;
		speedSegment?: number;
		trigger?: boolean;
		letterSpacing?: string;
		as?: string;
		style?: string;
	} = $props();

	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});

	const stagger = $derived(0.03 / speedReveal);
	const baseDuration = $derived(0.3 / speedSegment);

	type Segment = { type: 'char' | 'space'; char: string; delay: number };

	const segments = $derived((): Segment[] => {
		if (!text) return [];
		const result: Segment[] = [];
		let charCount = 0;
		const words = text.split(' ');
		for (let wi = 0; wi < words.length; wi++) {
			const word = words[wi];
			for (let ci = 0; ci < word.length; ci++) {
				result.push({
					type: 'char',
					char: word[ci],
					delay: delay + charCount * stagger,
				});
				charCount++;
			}
			if (wi < words.length - 1) {
				result.push({ type: 'space', char: ' ', delay: delay + charCount * stagger });
				charCount++;
			}
		}
		return result;
	});
</script>

{#if trigger}
	<svelte:element this={Tag} class={cn(className)} {style} aria-label={text}>
		<span class="sr-only">{text}</span>
		{#if mounted}
			{#each segments() as seg, i}
				<span
					class="inline-block"
					style="animation: blur-reveal-in {baseDuration}s ease forwards; animation-delay: {seg.delay}s; opacity: 0; filter: blur(12px); transform: translateY(10px); {letterSpacing
						? `margin-right: ${letterSpacing};`
						: ''}"
					aria-hidden="true"
				>
					{seg.char}
				</span>
			{/each}
		{:else}
			<span aria-hidden="true" style="opacity:0">{text}</span>
		{/if}
	</svelte:element>
{/if}

