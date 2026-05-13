<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	interface Props {
		items: Snippet[];
		speed?: number;
		class?: string;
		prefix?: Snippet;
		height?: number;
	}

	let { items, speed = 1, class: className, prefix, height = 200 }: Props = $props();

	const count = $derived(items.length);
</script>

<style>
	@keyframes slide-vertical {
		to { translate: 0 var(--destination); }
	}
</style>

<div class={cn('flex relative', className)}>
	<div class="flex relative overflow-hidden flex-row gap-1 items-center w-min h-min">
		{#if prefix}
			<div class="whitespace-pre size-auto relative">
				{@render prefix()}
			</div>
		{/if}
		<div
			class="opacity-100 mask-[linear-gradient(rgba(0,0,0,0)_0%,rgb(0,0,0)_43.6902%,rgba(0,0,0,0)_100%)] relative w-auto overflow-hidden"
			style="height: {height}px"
		>
			<div class="relative h-full" style="--count: {count}; --speed: {speed}">
				{#each items as item, index}
					<div
						class="h-[40px] flex items-center"
						style="
							--index: {index};
							--origin: calc((var(--count) - var(--index)) * 100%);
							--destination: calc((var(--index) + 1) * -100%);
							--duration: calc(var(--speed) * {count}s);
							--delay: calc((var(--duration) / var(--count)) * var(--index) - var(--duration));
							translate: 0 var(--origin);
							animation: slide-vertical var(--duration) var(--delay) infinite linear;
						"
					>
						{@render item()}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
