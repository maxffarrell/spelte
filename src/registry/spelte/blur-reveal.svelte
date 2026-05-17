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

	type WordSegment = { char: string; delay: number };
	type WordGroup = { chars: WordSegment[]; spaceDelay?: number };

	const segments = $derived.by((): WordGroup[] => {
		if (!text) return [];
		let charCount = 0;
		const words = text.split(' ');
		return words.map((word, wordIndex) => {
			const chars = word.split('').map((char) => {
				const segment = { char, delay: delay + charCount * stagger };
				charCount++;
				return segment;
			});
			const spaceDelay = wordIndex < words.length - 1 ? delay + charCount * stagger : undefined;
			if (spaceDelay !== undefined) charCount++;
			return { chars, spaceDelay };
		});
	});
</script>

{#if trigger}
	<svelte:element this={Tag} class={cn(className)} {style} aria-label={text}>
		<span class="sr-only">{text}</span>
		{#if mounted}
			{#each segments as word, wordIndex (`word-${wordIndex}`)}<span class="inline-block whitespace-nowrap" aria-hidden="true">{#each word.chars as seg, charIndex (`char-${wordIndex}-${charIndex}`)}<span
							class="inline-block"
							style="animation: blur-reveal-in {baseDuration}s ease forwards; animation-delay: {seg.delay}s; opacity: 0; filter: blur(12px); transform: translateY(10px); {letterSpacing
								? `margin-right: ${letterSpacing};`
								: ''}"
						>{seg.char}</span>{/each}{#if word.spaceDelay !== undefined}<span
							class="inline-block"
							style="animation: blur-reveal-in {baseDuration}s ease forwards; animation-delay: {word.spaceDelay}s; opacity: 0; filter: blur(12px); transform: translateY(10px);"
						>&nbsp;</span>{/if}</span>{/each}
		{:else}
			<span aria-hidden="true" style="opacity:0">{text}</span>
		{/if}
	</svelte:element>
{/if}
