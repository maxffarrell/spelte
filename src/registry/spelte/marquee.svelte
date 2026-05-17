<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		class?: string;
		duration?: number;
		pauseOnHover?: boolean;
		direction?: 'left' | 'right' | 'up' | 'down';
		fade?: boolean;
		fadeAmount?: number;
		[key: string]: unknown;
	}

	let {
		children,
		class: className,
		duration = 20,
		pauseOnHover = false,
		direction = 'left',
		fade = true,
		fadeAmount = 10,
		...rest
	}: Props = $props();

	let isPaused = $state(false);
	const isVertical = $derived(direction === 'up' || direction === 'down');

	const animationName = $derived(
		isVertical
			? (direction === 'up' ? 'marquee-scroll-y' : 'marquee-scroll-y-reverse')
			: (direction === 'left' ? 'marquee-scroll' : 'marquee-scroll-reverse')
	);

	const maskImage = $derived(
		fade
			? (isVertical
				? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
				: `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`)
			: undefined
	);
</script>


<div
	{...rest}
	class={cn('flex w-full overflow-hidden', isVertical && 'flex-col', className)}
	style={maskImage ? `-webkit-mask-image: ${maskImage}; mask-image: ${maskImage};` : undefined}
	onmouseenter={() => pauseOnHover && (isPaused = true)}
	onmouseleave={() => pauseOnHover && (isPaused = false)}
>
	<div
		class={cn('marquee-scroller flex shrink-0', isVertical && 'flex-col', isPaused && 'paused')}
		style="animation: {animationName} {duration}s linear infinite; animation-play-state: {isPaused ? 'paused' : 'running'};"
	>
		<div class={cn('flex shrink-0', isVertical && 'w-full')}>
			{@render children()}
		</div>
		<div class={cn('flex shrink-0', isVertical && 'w-full')}>
			{@render children()}
		</div>
	</div>
</div>
