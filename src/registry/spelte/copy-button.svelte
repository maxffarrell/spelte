<script lang="ts">
	import { cn } from '$lib/utils';
	import { CheckIcon, CopyIcon } from '@lucide/svelte';

	type SizeVariant = 'sm' | 'default' | 'lg';

	interface Props {
		value?: string;
		size?: SizeVariant;
		class?: string;
		onclick?: (e: MouseEvent) => void;
	}

	let { value, size = 'default', class: className, onclick }: Props = $props();

	const sizeMap: Record<SizeVariant, { button: string; icon: number }> = {
		sm: { button: 'h-8 w-8', icon: 14 },
		default: { button: 'h-9 w-9', icon: 16 },
		lg: { button: 'h-12 w-12', icon: 20 }
	};

	let copied = $state(false);

	function handleCopy(e: MouseEvent) {
		if (value) {
			navigator.clipboard.writeText(value).catch(() => {});
		}
		copied = true;
		setTimeout(() => (copied = false), 1500);
		onclick?.(e);
	}

	const buttonSize = $derived(sizeMap[size].button);
	const iconSize = $derived(sizeMap[size].icon);
</script>

<button
	type="button"
	onclick={handleCopy}
	aria-label={copied ? 'Copied' : 'Copy to clipboard'}
	disabled={copied}
	class={cn(
		'relative cursor-pointer active:scale-[0.97] transition-all ease-out duration-200 inline-flex items-center justify-center rounded-md text-neutral-900 disabled:pointer-events-none disabled:opacity-100 dark:text-neutral-50',
		buttonSize,
		className
	)}
>
	<div
		class={cn(
			'transition-all duration-200',
			copied ? 'scale-100 opacity-100 blur-none' : 'scale-70 opacity-0 blur-[2px]'
		)}
	>
		<CheckIcon size={iconSize} strokeWidth={2} aria-hidden="true" />
	</div>
	<div
		class={cn(
			'absolute transition-all duration-200',
			copied ? 'scale-0 opacity-0 blur-[2px]' : 'scale-100 opacity-100 blur-none'
		)}
	>
		<CopyIcon size={iconSize} strokeWidth={2} aria-hidden="true" />
	</div>
</button>
