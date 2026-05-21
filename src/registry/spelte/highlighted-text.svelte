<script lang="ts">
	import { cn } from '$lib/utils';
	import { motion, useInView, type AnimationOptions, type Variants } from 'motion-sv';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type From = 'left' | 'right' | 'top' | 'bottom';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		children?: Snippet;
		class?: string;
		from?: From;
		delay?: number;
		inView?: boolean;
		inViewProp?: boolean;
		once?: boolean;
	}

	const transition: AnimationOptions = {
		type: 'spring',
		damping: 30,
		stiffness: 300
	};

	const fromVariants: Record<From, Variants> = {
		left: { hidden: { x: '-100%' }, visible: { x: '0%' } },
		right: { hidden: { x: '100%' }, visible: { x: '0%' } },
		top: { hidden: { y: '-100%' }, visible: { y: '0%' } },
		bottom: { hidden: { y: '100%' }, visible: { y: '0%' } }
	};

	let {
		children,
		class: className,
		from = 'bottom',
		delay = 0,
		inView = false,
		inViewProp = false,
		once = true,
		...props
	}: Props = $props();

	let element = $state<HTMLSpanElement | null>(null);
	const triggerInView = $derived(inView || inViewProp);
	let view = useInView(
		() => (triggerInView ? element : null)!,
		() => ({ once }) as any
	);
	const variants = $derived(fromVariants[from]);
	const isVisible = $derived(triggerInView ? view.current : true);
</script>

<span
	bind:this={element}
	class={cn('relative inline-flex overflow-hidden align-baseline', className)}
	{...props}
>
	<motion.span
		class="absolute inset-0 -left-[0.15em] -right-[0.18em] bg-black dark:bg-white z-0"
		initial="hidden"
		animate={isVisible ? 'visible' : 'hidden'}
		{variants}
		transition={{ ...transition, delay }}
	/>
	<span class="relative z-10 mix-blend-difference text-white pl-[0.15em] pr-[0.18em]">
		{@render children?.()}
	</span>
</span>
