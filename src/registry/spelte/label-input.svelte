<script lang="ts">
	import { cn } from '$lib/utils';
	import { EyeIcon, EyeOffIcon } from '@lucide/svelte';

	type RingColor =
		| 'muted' | 'primary' | 'secondary' | 'destructive'
		| 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink'
		| 'orange' | 'cyan' | 'indigo' | 'violet' | 'rose' | 'amber'
		| 'lime' | 'emerald' | 'sky' | 'slate' | 'fuchsia';

	interface Props {
		label?: string;
		ringColor?: RingColor;
		containerClass?: string;
		class?: string;
		type?: string;
		placeholder?: string;
		value?: string;
		[key: string]: unknown;
	}

	let {
		label = '',
		ringColor = 'muted',
		containerClass,
		class: className,
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		...rest
	}: Props = $props();

	const ringColorMap: Record<RingColor, string> = {
		muted: 'focus:ring-muted',
		primary: 'focus:ring-primary',
		secondary: 'focus:ring-secondary',
		destructive: 'focus:ring-destructive',
		red: 'focus:ring-red-600',
		blue: 'focus:ring-blue-600',
		green: 'focus:ring-green-600',
		yellow: 'focus:ring-yellow-600',
		purple: 'focus:ring-purple-600',
		pink: 'focus:ring-pink-600',
		orange: 'focus:ring-orange-600',
		cyan: 'focus:ring-cyan-600',
		indigo: 'focus:ring-indigo-600',
		violet: 'focus:ring-violet-600',
		rose: 'focus:ring-rose-600',
		amber: 'focus:ring-amber-600',
		lime: 'focus:ring-lime-600',
		emerald: 'focus:ring-emerald-600',
		sky: 'focus:ring-sky-600',
		slate: 'focus:ring-slate-600',
		fuchsia: 'focus:ring-fuchsia-600'
	};

	const isPasswordType = $derived(type === 'password');
	const inputId = `label-input-${Math.random().toString(36).slice(2)}`;
	let isVisible = $state(false);
	const inputType = $derived(isPasswordType ? (isVisible ? 'text' : 'password') : type);
</script>

<div class={cn('group relative w-full', className, containerClass)}>
	<input
		class={cn(
			'block outline-none peer text-primary w-full px-3.5 h-10 text-sm rounded-lg border focus:ring-2 dark:bg-neutral-950 dark:border-neutral-700/75 autofill:shadow-[inset_0_0_0px_1000px_var(--color-background)]',
			isPasswordType && 'pr-9',
			ringColorMap[ringColor]
		)}
		{placeholder}
		id={inputId}
		type={inputType}
		bind:value
		{...rest}
	/>
	<label for={inputId} class="absolute block inset-y-0 px-2 bg-white dark:bg-neutral-950 text-sm left-[7px] h-fit text-nowrap my-auto -translate-y-[19px] peer-focus:-translate-y-[19px] text-muted-foreground pointer-events-none transition-transform will duration-200 scale-[.8] origin-top-left peer-placeholder-shown:scale-100 peer-focus:scale-[.8] peer-placeholder-shown:translate-y-0">
		{label}
	</label>
	{#if isPasswordType}
		<button
			class="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
			type="button"
			onclick={() => (isVisible = !isVisible)}
			aria-label={isVisible ? 'Hide password' : 'Show password'}
			aria-pressed={isVisible}
		>
			{#if isVisible}
				<EyeOffIcon size={16} aria-hidden="true" />
			{:else}
				<EyeIcon size={16} aria-hidden="true" />
			{/if}
		</button>
	{/if}
</div>
