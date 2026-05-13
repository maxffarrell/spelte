<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		colors: string[];
		size?: 'default' | 'sm' | 'lg';
		defaultValue: string;
		name?: string;
		onColorSelect?: (color: string) => void;
		class?: string;
	}

	let { colors, size = 'default', defaultValue, name, onColorSelect, class: className }: Props = $props();

	const colorMap: Record<string, string> = {
		default: 'var(--foreground)',
		red: 'var(--color-red-500)',
		green: 'var(--color-green-500)',
		blue: 'var(--color-blue-500)',
		yellow: 'var(--color-yellow-500)',
		purple: 'var(--color-purple-500)',
		pink: 'var(--color-pink-500)',
		indigo: 'var(--color-indigo-500)',
		orange: 'var(--color-orange-500)',
		teal: 'var(--color-teal-500)',
		cyan: 'var(--color-cyan-500)',
		lime: 'var(--color-lime-500)',
		emerald: 'var(--color-emerald-500)',
		violet: 'var(--color-violet-500)',
		fuchsia: 'var(--color-fuchsia-500)',
		rose: 'var(--color-rose-500)',
		sky: 'var(--color-sky-500)',
		amber: 'var(--color-amber-500)'
	};

	let selectedColor = $state(defaultValue);

	function handleColorSelect(color: string) {
		selectedColor = color;
		onColorSelect?.(color);
	}

	const sizeClass = $derived(
		size === 'sm' ? 'size-4' : size === 'lg' ? 'size-6' : 'size-5'
	);

	function getColorValue(color: string): string {
		return colorMap[color] || color;
	}
</script>

<div class={cn('flex gap-2', className)}>
	{#if name}
		<input type="hidden" {name} value={selectedColor} />
	{/if}
	{#each colors as color}
		{@const colorValue = getColorValue(color)}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<div
			class="{sizeClass} rounded-full cursor-pointer transition-transform duration-200 active:scale-90"
			style="background-color: {colorValue}; {selectedColor === color ? `box-shadow: inset 0 0 0 2px var(--background), 0 0 0 2px ${colorValue};` : ''}"
			onclick={() => handleColorSelect(color)}
			onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleColorSelect(color); } }}
			role="button"
			tabindex="0"
			aria-label="Select {color} color"
			aria-pressed={selectedColor === color}
		></div>
	{/each}
</div>
