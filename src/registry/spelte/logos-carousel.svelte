<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		logos: Snippet[];
		stagger?: number;
		count?: number;
		class?: string;
		duration?: number;
		interval?: number;
		initialDelay?: number;
	}

	let {
		logos,
		stagger = 0.14,
		count,
		class: className,
		duration = 600,
		interval = 2500,
		initialDelay = 500
	}: Props = $props();

	const logosPerGroup = $derived(count || logos.length);
	const groups = $derived.by(() => {
		const result: Snippet[][] = [];
		for (let i = 0; i < logos.length; i += logosPerGroup) {
			result.push(logos.slice(i, i + logosPerGroup));
		}
		return result;
	});

	let currentIndex = $state(0);
	let nextIndex = $state(1);
	let animate = $state(false);

	$effect(() => {
		const id = setTimeout(() => (animate = true), initialDelay);
		return () => clearTimeout(id);
	});

	$effect(() => {
		if (!animate || groups.length === 0) return;
		const id = setInterval(() => {
			currentIndex = (currentIndex + 1) % groups.length;
			nextIndex = (currentIndex + 1) % groups.length;
		}, interval);
		return () => clearInterval(id);
	});
</script>

<style>
	@keyframes logos-enter {
		0% { transform: translateY(40px); filter: blur(4px); opacity: 0; }
		100% { transform: translateY(0); filter: blur(0px); opacity: 1; }
	}
	@keyframes logos-exit {
		0% { transform: translateY(0); filter: blur(0px); opacity: 1; }
		100% { transform: translateY(-40px); filter: blur(4px); opacity: 0; }
	}
</style>

<div class="max-w-[720px] grid place-items-center w-full">
	{#each groups as group, groupIndex}
		{@const isCurrent = groupIndex === currentIndex}
		{@const isNext = groupIndex === nextIndex && animate}
		{@const isVisible = isCurrent || isNext}
		<div
			class={cn('flex w-full justify-center gap-10', className)}
			style="grid-area: 1 / 1; pointer-events: {isVisible ? 'auto' : 'none'};"
		>
			{#each group as logo, logoIndex}
				{@const d = logoIndex * stagger}
				{@const state = isCurrent ? 'exit' : 'enter'}
				{@const animName = state === 'enter' ? 'logos-enter' : 'logos-exit'}
				<div
					style="
						animation-delay: {d}s;
						animation-duration: {duration}ms;
						animation-fill-mode: both;
						{animate && isVisible ? `animation-name: ${animName}; animation-timing-function: ease;` : ''}
						opacity: {!animate && state === 'exit' ? 1 : !animate && state === 'enter' ? 0 : undefined};
					"
				>
					{@render logo()}
				</div>
			{/each}
		</div>
	{/each}
</div>
