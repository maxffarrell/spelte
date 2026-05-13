<script lang="ts">
	import { cn } from '$lib/utils';
	import { animate } from 'motion';

	interface Props {
		title?: string;
		defaultChecked?: boolean;
		class?: string;
		onCheckedChange?: (checked: boolean) => void;
	}

	let {
		title = 'Implement Checkbox',
		defaultChecked = false,
		class: className,
		onCheckedChange
	}: Props = $props();

	let checked = $state(defaultChecked);
	let pathEl = $state<SVGPathElement | null>(null);
	let strikeEl = $state<HTMLDivElement | null>(null);

	function handleClick() {
		checked = !checked;
		onCheckedChange?.(checked);

		if (pathEl) {
			animate(pathEl, { pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0 }, {
				pathLength: { ease: 'easeOut', duration: 0.3 },
				opacity: { duration: 0 }
			});
		}
		if (strikeEl) {
			animate(strikeEl, { width: checked ? '100%' : '0%', opacity: checked ? 1 : 0 }, {
				type: 'spring',
				duration: 0.4,
				bounce: 0.2
			});
		}
	}

	$effect(() => {
		if (pathEl && defaultChecked) {
			animate(pathEl, { pathLength: 1, opacity: 1 }, { duration: 0 });
		}
		if (strikeEl && defaultChecked) {
			animate(strikeEl, { width: '100%', opacity: 1 }, { duration: 0 });
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
	class={cn('flex items-center gap-3 cursor-pointer select-none', className)}
	onclick={handleClick}
>
	<div
		class={cn(
			'size-4.5 rounded-[6px] flex items-center justify-center border-[1.5px] transition-colors duration-200',
			checked
				? 'bg-foreground border-transparent'
				: 'bg-transparent border-muted-foreground/40 hover:border-muted-foreground/60'
		)}
	>
		<svg viewBox="0 0 20 20" class="size-full text-background">
			<path
				bind:this={pathEl}
				d="M 0 4.5 L 3.182 8 L 10 0"
				fill="transparent"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				transform="translate(5 6)"
				style="opacity: {defaultChecked ? 1 : 0}; pathLength: {defaultChecked ? 1 : 0}"
			/>
		</svg>
	</div>
	<div class="relative">
		<span
			class={cn(
				'text-base font-medium transition-colors duration-200',
				checked ? 'text-muted-foreground' : 'text-foreground'
			)}
		>
			{title}
		</span>
		<div
			bind:this={strikeEl}
			class="absolute left-0 top-1/2 h-[1.5px] bg-muted-foreground -translate-y-1/2"
			style="width: {defaultChecked ? '100%' : '0'}; opacity: {defaultChecked ? 1 : 0}"
		></div>
	</div>
</div>
