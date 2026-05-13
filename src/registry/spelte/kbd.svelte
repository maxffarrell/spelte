<script lang="ts">
	import { cn } from '$lib/utils';

	type KeyItem = string | { display: string; key: string };

	interface Props {
		keys: KeyItem[];
		class?: string;
		active?: boolean;
		listenToKeyboard?: boolean;
	}

	let { keys = [], class: className, active, listenToKeyboard = false }: Props = $props();

	const keySymbolMap: Record<string, string> = {
		command: '⌘', cmd: '⌘', control: '⌃', ctrl: '⌃', alt: '⌥', option: '⌥',
		space: '␣', arrowleft: '←', left: '←', arrowdown: '↓', down: '↓',
		arrowup: '↑', up: '↑', arrowright: '→', right: '→'
	};

	function getKeyDisplay(item: KeyItem): string {
		const key = typeof item === 'string' ? item : item.display;
		const lower = key.toLowerCase();
		return keySymbolMap[lower] || key.toUpperCase();
	}

	function getHotkeyKeys(): string[] {
		return keys.map((item) => {
			const key = typeof item === 'string' ? item : item.key;
			return key.toLowerCase();
		});
	}

	let isPressed = $state(false);
	const isActive = $derived(active || isPressed);

	$effect(() => {
		if (!listenToKeyboard) return;

		const hotkeyKeys = getHotkeyKeys();

		function handleKeyDown(e: KeyboardEvent) {
			const pressedKeys = new Set<string>();
			if (e.metaKey) pressedKeys.add('meta');
			if (e.ctrlKey) pressedKeys.add('ctrl');
			if (e.altKey) pressedKeys.add('alt');
			if (e.shiftKey) pressedKeys.add('shift');
			pressedKeys.add(e.key.toLowerCase());

			const matches = hotkeyKeys.every((k) => {
				if (k === 'command' || k === 'cmd') return e.metaKey;
				if (k === 'control' || k === 'ctrl') return e.ctrlKey;
				if (k === 'alt' || k === 'option') return e.altKey;
				if (k === 'shift') return e.shiftKey;
				return pressedKeys.has(k);
			});
			if (matches) isPressed = true;
		}

		function handleKeyUp() { isPressed = false; }
		function handleBlur() { isPressed = false; }

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		window.addEventListener('blur', handleBlur);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			window.removeEventListener('blur', handleBlur);
		};
	});
</script>

<kbd
	class={cn(
		'box-border align-text-top whitespace-nowrap select-none cursor-default tracking-tight rounded-[0.35em] min-w-[1.75em] shrink-0 justify-center items-center pb-[0.05em] px-[0.5em] text-[0.75em] font-normal leading-[1.7em] inline-flex relative -top-[0.03em] transition-all duration-100',
		isActive
			? 'bg-background text-foreground translate-y-[0.05em] shadow-[inset_0_0.05em_rgba(255,255,255,0.95),inset_0_0.05em_0.2em_rgba(0,0,0,0.1),0_0_0_0.05em_rgba(0,0,0,0.134)] dark:shadow-[inset_0_0.05em_0.2em_rgba(0,0,0,0.3),0_0_0_0.05em_rgba(255,255,255,0.134)]'
			: 'bg-background text-foreground shadow-[inset_0_-0.05em_0.5em_rgba(0,0,0,0.034),inset_0_0.05em_rgba(255,255,255,0.95),inset_0_0.25em_0.5em_rgba(0,0,0,0.034),inset_0_-0.05em_rgba(0,0,0,0.172),0_0_0_0.05em_rgba(0,0,0,0.134),0_0.08em_0.17em_rgba(0,0,0,0.231)] dark:shadow-[inset_0_-0.05em_0.5em_rgba(255,255,255,0.034),inset_0_0.05em_rgba(255,255,255,0.1),inset_0_0.25em_0.5em_rgba(255,255,255,0.034),inset_0_-0.05em_rgba(255,255,255,0.172),0_0_0_0.05em_rgba(255,255,255,0.134),0_0.08em_0.17em_rgba(255,255,255,0.231)]',
		className
	)}
>
	{#each keys as item, index}
		<span class={index > 0 ? 'ml-0.5' : ''}>{getKeyDisplay(item)}</span>
	{/each}
</kbd>
