<script lang="ts">
	import { inView } from 'motion';

	interface Props {
		text: string;
		speed?: number;
		delay?: number;
		class?: string;
		inViewProp?: boolean;
		once?: boolean;
	}

	let { text, speed = 20, delay = 0, class: className = '', inViewProp = false, once = true }: Props = $props();

	const RANDOM_CHARS = '_!X$0-+*#';

	function getRandomChar(prevChar?: string): string {
		let char: string;
		do {
			char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
		} while (char === prevChar);
		return char;
	}

	let displayText = $state('');
	let phase = $state<'phase1' | 'phase2'>('phase1');
	let animationStep = $state(0);
	let hasStarted = $state(false);
	let containerEl = $state<HTMLElement | null>(null);
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let initialized = false;

	function startAnimation() {
		hasStarted = true;
		displayText = ' '.repeat(text.length);
		phase = 'phase1';
		animationStep = 0;
	}

	function runPhase1() {
		const maxSteps = text.length * 2;
		const currentLength = Math.min(animationStep + 1, text.length);
		const chars: string[] = [];
		for (let i = 0; i < currentLength; i++) {
			chars.push(getRandomChar(i > 0 ? chars[i - 1] : undefined));
		}
		for (let i = currentLength; i < text.length; i++) chars.push(' ');
		displayText = chars.join('');
		if (animationStep < maxSteps - 1) {
			animationStep++;
		} else {
			phase = 'phase2';
			animationStep = 0;
		}
	}

	function runPhase2() {
		const revealedCount = Math.floor(animationStep / 2);
		const chars: string[] = [];
		for (let i = 0; i < revealedCount && i < text.length; i++) chars.push(text[i]);
		if (revealedCount < text.length) {
			chars.push(animationStep % 2 === 0 ? '_' : getRandomChar());
		}
		for (let i = chars.length; i < text.length; i++) chars.push(getRandomChar());
		displayText = chars.join('');
		if (animationStep < text.length * 2 - 1) {
			animationStep++;
		} else {
			displayText = text;
			if (intervalId) { clearInterval(intervalId); intervalId = null; }
		}
	}

	$effect(() => {
		if (initialized) return;
		initialized = true;
		displayText = ' '.repeat(text.length);
		hasStarted = !inViewProp && delay <= 0;
	});

	$effect(() => {
		if (!hasStarted) return;
		if (intervalId) clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (phase === 'phase1') runPhase1(); else runPhase2();
		}, speed);
		return () => { if (intervalId) clearInterval(intervalId); };
	});

	$effect(() => {
		if (!containerEl) return;
		if (inViewProp) {
			const cleanup = inView(containerEl, () => {
				if (delay > 0) {
					setTimeout(startAnimation, delay * 1000);
				} else {
					startAnimation();
				}
				if (once) return () => {};
			}, { margin: '-100px' });
			return cleanup as () => void;
		} else if (!hasStarted) {
			if (delay > 0) {
				const t = setTimeout(startAnimation, delay * 1000);
				return () => clearTimeout(t);
			} else {
				startAnimation();
			}
		}
	});
</script>

<span
	bind:this={containerEl}
	class="h-4.5 leading-5 inline-flex font-mono font-medium {className}"
>
	{displayText}
</span>
