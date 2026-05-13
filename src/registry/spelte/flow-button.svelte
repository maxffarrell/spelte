<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type SizeVariant = 'sm' | 'default' | 'lg';

	interface Props {
		children: Snippet;
		size?: SizeVariant;
		borderColor?: string;
		class?: string;
		href?: string;
		[key: string]: unknown;
	}

	let {
		children,
		size = 'default',
		borderColor = 'var(--rotating-border-color)',
		class: className,
		href,
		...rest
	}: Props = $props();

	const sizeMap: Record<SizeVariant, string> = {
		sm: 'h-8 rounded-full gap-1.5 px-3 text-sm',
		default: 'h-9 px-4 py-2 text-sm rounded-full',
		lg: 'h-10 rounded-full px-6 text-sm'
	};

	const borderRadiusMap: Record<SizeVariant, number> = {
		sm: 16,
		default: 18,
		lg: 20
	};

	let buttonEl = $state<HTMLElement | null>(null);
	let width = $state(0);
	let height = $state(0);

	$effect(() => {
		if (buttonEl) {
			width = buttonEl.offsetWidth;
			height = buttonEl.offsetHeight;
		}
	});

	const radius = $derived(borderRadiusMap[size]);
	const buttonSize = $derived(sizeMap[size]);

	function createRoundedRectPath(w: number, h: number, r: number): string {
		return `M${r},0.5 H${w - r} A${r},${r} 0 0 1 ${w - 0.5},${r} V${h - r} A${r},${r} 0 0 1 ${w - r},${h - 0.5} H${r} A${r},${r} 0 0 1 0.5,${h - r} V${r} A${r},${r} 0 0 1 ${r},0.5 Z`;
	}

	const btnClass = $derived(
		cn(
			'relative z-0 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 pointer-events-auto cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-[550] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-neutral-100 dark:bg-muted/50 text-primary dark:hover:bg-transparent hover:bg-transparent',
			buttonSize,
			className
		)
	);
</script>


<div class="relative inline-block group pointer-events-none">
	<div
		class="absolute inset-[2px] group-hover:inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all ease-out duration-200 z-10"
		style="border-radius: {radius}px"
	>
		{#if width && height}
			<svg
				{width}
				{height}
				viewBox="0 0 {width} {height}"
				aria-hidden="true"
				preserveAspectRatio="none"
				class="absolute top-0 left-0 w-full h-full pointer-events-none"
			>
				<path
					d={createRoundedRectPath(width, height, radius)}
					fill="none"
					stroke={borderColor}
					stroke-width="1"
					stroke-dasharray="6,4"
					stroke-dashoffset="0"
					class="group-hover:animate-[dash-flow_1s_linear_infinite]"
				/>
			</svg>
		{/if}
	</div>
	{#if href}
		<a bind:this={buttonEl} {href} class={btnClass} {...rest}>
			{@render children()}
		</a>
	{:else}
		<button bind:this={buttonEl} class={btnClass} {...rest}>
			{@render children()}
		</button>
	{/if}
</div>
