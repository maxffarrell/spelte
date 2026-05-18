<script lang="ts">
	import { cn } from '$lib/utils';
	import { animate, inView, type DOMKeyframesDefinition } from 'motion-sv';

	interface Props {
		text: string;
		split?: 'words' | 'characters';
		delay?: number;
		stagger?: number;
		from?: 'first' | 'last' | 'center';
		class?: string;
		wordClass?: string;
		charClass?: string;
		autoStart?: boolean;
		onStart?: () => void;
		onComplete?: () => void;
		inViewProp?: boolean;
		once?: boolean;
	}

	let {
		text,
		split = 'words',
		delay = 0,
		stagger = 0.1,
		from = 'first',
		class: className,
		wordClass,
		charClass,
		autoStart = true,
		onStart,
		onComplete,
		inViewProp = false,
		once = true
	}: Props = $props();

	interface WordObject {
		characters: string[];
		needsSpace: boolean;
	}

	function splitIntoCharacters(str: string): string[] {
		if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
			const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
			return Array.from(segmenter.segment(str), ({ segment }) => segment);
		}
		return Array.from(str);
	}

	const wordObjects: WordObject[] = $derived.by(() => {
		const words = text.split(' ');
		if (split === 'characters') {
			return words.map((word, i) => ({
				characters: splitIntoCharacters(word),
				needsSpace: i !== words.length - 1
			}));
		}
		return words.map((word, i) => ({
			characters: [word],
			needsSpace: i !== words.length - 1
		}));
	});

	const totalChars = $derived(
		wordObjects.reduce((acc, w) => acc + w.characters.length + (w.needsSpace ? 1 : 0), 0)
	);

	function getStaggerDelay(index: number): number {
		if (from === 'first') return index * stagger;
		if (from === 'last') return (totalChars - 1 - index) * stagger;
		const center = Math.floor(totalChars / 2);
		return Math.abs(center - index) * stagger;
	}

	let containerEl = $state<HTMLElement | null>(null);
	let charEls: HTMLElement[] = [];

	function registerChar(el: HTMLElement) {
		charEls.push(el);
		el.style.transform = 'translateY(100%)';
		return {
			destroy() {
				charEls = charEls.filter((e) => e !== el);
			}
		};
	}

	function runAnimation() {
		onStart?.();
		charEls.forEach((el, i) => {
			if (!el) return;
			// @ts-ignore — motion overload resolution fails in TS6; runtime behavior is correct
			animate(el as Element, { y: ['100%', '0%'] }, {
				type: 'tween',
				ease: [0.625, 0.05, 0, 1] as unknown as string,
				duration: 0.5,
				delay: delay + getStaggerDelay(i)
			});
		});
		if (charEls.length > 0 && onComplete) {
			const lastDelay = delay + getStaggerDelay(charEls.length - 1);
			setTimeout(onComplete, (lastDelay + 0.5) * 1000);
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

<span bind:this={containerEl} class={cn(className, 'flex flex-wrap whitespace-pre-wrap')}>
	<span class="sr-only">{text}</span>
	{#each wordObjects as wordObj}
		<span aria-hidden="true" class={cn('inline-flex overflow-hidden', wordClass)}>
			{#each wordObj.characters as char}
				<span class={cn(charClass, 'whitespace-pre-wrap relative overflow-hidden')}>
					<span class="inline-block" use:registerChar>{char}</span>
				</span>
			{/each}
			{#if wordObj.needsSpace}
				<span class="relative overflow-hidden">
					<span class="inline-block" use:registerChar>{' '}</span>
				</span>
			{/if}
		</span>
	{/each}
</span>
