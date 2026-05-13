<script lang="ts">
	import { cn } from '$lib/utils';
	import { animate, inView } from 'motion';

	interface Props {
		text: string;
		class?: string;
		delay?: number;
		stagger?: number;
		speed?: number;
		autoStart?: boolean;
		onStart?: () => void;
		onComplete?: () => void;
		inViewProp?: boolean;
		once?: boolean;
	}

	let {
		text,
		class: className,
		delay = 0,
		stagger = 0.1,
		speed = 0.5,
		autoStart = true,
		onStart,
		onComplete,
		inViewProp = false,
		once = true
	}: Props = $props();

	const words = $derived(text.split(' ').filter((w) => w.length > 0));

	let containerEl = $state<HTMLElement | null>(null);
	let wordEls: HTMLElement[] = [];

	function registerWord(el: HTMLElement) {
		wordEls.push(el);
		el.style.opacity = '0';
		el.style.transform = 'translateY(10px)';
		el.style.filter = 'blur(10px)';
		return {
			destroy() {
				wordEls = wordEls.filter((e) => e !== el);
			}
		};
	}

	function runAnimation() {
		onStart?.();
		wordEls.forEach((el, i) => {
			animate(
				el,
				{ opacity: [0, 1], y: [10, 0], filter: ['blur(10px)', 'blur(0px)'] },
				{ type: 'tween', ease: 'easeOut', duration: speed, delay: delay + i * stagger }
			);
		});
		if (wordEls.length > 0 && onComplete) {
			const lastDelay = delay + (wordEls.length - 1) * stagger + speed;
			setTimeout(onComplete, lastDelay * 1000);
		}
	}

	$effect(() => {
		if (!containerEl) return;
		if (inViewProp) {
			const cleanup = inView(containerEl, () => {
				runAnimation();
				if (once) return () => {};
			});
			return cleanup as () => void;
		} else if (autoStart) {
			runAnimation();
		}
	});
</script>

<div bind:this={containerEl} class={cn('flex flex-wrap', className)}>
	{#each words as word, index}
		<span class="inline-block" use:registerWord>
			{word}{#if index < words.length - 1}<span class="inline-block">&nbsp;</span>{/if}
		</span>
	{/each}
</div>
