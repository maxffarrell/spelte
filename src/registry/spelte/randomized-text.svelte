<script lang="ts">
	import { animate, inView, type DOMKeyframesDefinition } from 'motion-sv';

	type SplitType = 'words' | 'chars';

	interface Props {
		text: string;
		class?: string;
		split?: SplitType;
		delay?: number;
		inViewProp?: boolean;
		once?: boolean;
	}

	let { text, class: className = '', split = 'words', delay = 0.2, inViewProp = false, once = true }: Props = $props();

	function expoOut(t: number): number {
		return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
	}

	const elements = $derived.by(() => {
		if (split === 'chars') {
			return text.split('').map((char, i) => ({
				content: char === ' ' ? ' ' : char,
				key: `char-${i}`
			}));
		}
		return text.split(' ').map((word, i) => ({
			content: word,
			key: `word-${i}`
		}));
	});

	const randomizedDelays = $derived(
		elements.map(() => delay + Math.random() * 0.2 + Math.random() * 0.03)
	);

	let containerEl = $state<HTMLElement | null>(null);
	let spanEls: HTMLElement[] = [];

	function registerSpan(el: HTMLElement, i: number) {
		spanEls[i] = el;
		el.style.opacity = '0';
		return {
			destroy() {
				spanEls[i] = null as unknown as HTMLElement;
			}
		};
	}

	function runAnimation() {
		spanEls.forEach((el, i) => {
			if (!el) return;
			// @ts-ignore — motion overload resolution fails in TS6; runtime behavior is correct
			animate(el as Element, { opacity: [0, 1] }, {
				duration: 1.2,
				delay: randomizedDelays[i],
				ease: expoOut as unknown as string
			});
		});
	}

	$effect(() => {
		if (!containerEl) return;
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

<span
	bind:this={containerEl}
	{...{ 'aria-label': text }}
	class={className}
	style="display: inline-block; word-break: break-word;"
>
	{#each elements as element, i}
		<span
			use:registerSpan={i}
			style="display: {split === 'words' ? 'inline-block' : 'inline'}; {split === 'words' ? 'margin-right: 0.25em;' : ''}"
		>
			{element.content}
		</span>
	{/each}
</span>
