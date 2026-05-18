<script lang="ts">
	import { cn } from '$lib/utils';

	type Logo = {
		src: string;
		alt: string;
	};

	interface Props {
		logos: Logo[];
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
		const result: Logo[][] = [];
		for (let i = 0; i < logos.length; i += logosPerGroup) {
			result.push(logos.slice(i, i + logosPerGroup));
		}
		return result;
	});

	let currentIndex = $state(0);
	let nextIndex = $state(1);
	let animate = $state(false);
	let exitingIndex = $state(0);
	let transitionActive = $state(false);

	$effect(() => {
		const id = setTimeout(() => (animate = true), initialDelay);
		return () => clearTimeout(id);
	});

	$effect(() => {
		if (!animate || groups.length === 0) return;
		const id = setInterval(() => {
			const previousIndex = currentIndex;
			const newIndex = (currentIndex + 1) % groups.length;
			exitingIndex = previousIndex;
			currentIndex = newIndex;
			nextIndex = (newIndex + 1) % groups.length;
			transitionActive = true;
			window.setTimeout(() => {
				transitionActive = false;
			}, duration + (logosPerGroup - 1) * stagger * 1000);
		}, interval);
		return () => clearInterval(id);
	});
</script>


<div class="max-w-[720px] grid place-items-center w-full">
	{#each groups as group, groupIndex (groupIndex)}
		{@const isEntering = groupIndex === currentIndex}
		{@const isExiting = transitionActive && groupIndex === exitingIndex}
		{@const isVisible = isEntering || isExiting}
		<div
			class={cn('flex w-full justify-center gap-10', className)}
			aria-hidden={!isVisible}
			style="grid-area: 1 / 1; pointer-events: {isVisible ? 'auto' : 'none'}; visibility: {isVisible ? 'visible' : 'hidden'};"
		>
			{#each group as logo, logoIndex (logo.src)}
				{@const d = logoIndex * stagger}
				{@const state = isExiting ? 'exit' : 'enter'}
				{@const animName = state === 'enter' ? 'logos-enter' : 'logos-exit'}
				<div
					style="
						animation-delay: {d}s;
						animation-duration: {duration}ms;
						animation-fill-mode: both;
						{animate && isVisible ? `animation-name: ${animName}; animation-timing-function: ease;` : ''}
						opacity: {!animate && isEntering ? 1 : !isVisible ? 0 : undefined};
					"
				>
					<img
						src={logo.src}
						alt={logo.alt}
						width="96"
						height="96"
						class="h-24 w-24 object-contain opacity-70 not-dark:invert-100 pointer-events-none select-none"
					/>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	@keyframes logos-enter {
		0% {
			transform: translateY(40px);
			filter: blur(4px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			filter: blur(0px);
			opacity: 1;
		}
	}

	@keyframes logos-exit {
		0% {
			transform: translateY(0);
			filter: blur(0px);
			opacity: 1;
		}
		100% {
			transform: translateY(-40px);
			filter: blur(4px);
			opacity: 0;
		}
	}
</style>
