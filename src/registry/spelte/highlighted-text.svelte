<script lang="ts">
	import { cn } from '$lib/utils';
	import { animate, inView } from 'motion';
	import type { Snippet } from 'svelte';

	type From = 'left' | 'right' | 'top' | 'bottom';

	interface Props {
		children: Snippet;
		class?: string;
		from?: From;
		delay?: number;
		inViewProp?: boolean;
		once?: boolean;
	}

	let { children, class: className, from = 'bottom', delay = 0, inViewProp = false, once = true }: Props = $props();

	const fromVariants: Record<From, { hidden: Record<string, string>; visible: Record<string, string> }> = {
		left: { hidden: { x: '-100%' }, visible: { x: '0%' } },
		right: { hidden: { x: '100%' }, visible: { x: '0%' } },
		top: { hidden: { y: '-100%' }, visible: { y: '0%' } },
		bottom: { hidden: { y: '100%' }, visible: { y: '0%' } }
	};

	let containerEl = $state<HTMLElement | null>(null);
	let highlightEl = $state<HTMLElement | null>(null);

	function runAnimation() {
		if (!highlightEl) return;
		const variants = fromVariants[from];
		Object.assign(highlightEl.style, variants.hidden);
		animate(highlightEl, variants.visible as Parameters<typeof animate>[1], {
			type: 'spring',
			damping: 30,
			stiffness: 300,
			delay
		});
	}

	$effect(() => {
		if (!containerEl || !highlightEl) return;
		const variants = fromVariants[from];
		Object.assign(highlightEl.style, variants.hidden);

		if (inViewProp) {
			const cleanup = inView(containerEl, () => {
				runAnimation();
				if (once) return () => {};
			});
			return cleanup as () => void;
		} else {
			runAnimation();
		}
	});
</script>

<span bind:this={containerEl} class={cn('relative inline-flex overflow-hidden align-baseline', className)}>
	<span
		bind:this={highlightEl}
		class="absolute inset-0 -left-[0.15em] -right-[0.18em] bg-black dark:bg-white z-0"
	></span>
	<span class="relative z-10 mix-blend-difference text-white pl-[0.15em] pr-[0.18em]">
		{@render children()}
	</span>
</span>
