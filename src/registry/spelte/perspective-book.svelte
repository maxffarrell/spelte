<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let {
		size = 'default',
		class: className,
		children,
		textured = false,
	}: {
		size?: 'sm' | 'default' | 'lg';
		class?: string;
		children?: Snippet;
		textured?: boolean;
	} = $props();

	const sizeMap = {
		sm: { width: '150px', spineTranslation: '122px' },
		default: { width: '196px', spineTranslation: '168px' },
		lg: { width: '300px', spineTranslation: '272px' },
	};

	const defaultColorClasses =
		'bg-neutral-100 dark:bg-[#1f1f1f] dark:before:content-[""] dark:before:bg-gradient-to-b dark:before:from-[#ffffff1a] dark:before:to-transparent dark:before:absolute dark:before:inset-0 dark:before:rounded-[inherit] text-primary';

	const spineHighlight =
		'linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 12%, hsla(0, 0%, 100%, .25) 29.25%, hsla(0, 0%, 100%, 0) 50.5%, hsla(0, 0%, 100%, 0) 75.25%, hsla(0, 0%, 100%, .25) 91%, hsla(0, 0%, 100%, 0)), linear-gradient(90deg, rgba(0, 0, 0, .03), rgba(0, 0, 0, .1) 12%, transparent 30%, rgba(0, 0, 0, .02) 50%, rgba(0, 0, 0, .2) 73.5%, rgba(0, 0, 0, .5) 75.25%, rgba(0, 0, 0, .15) 85.25%, transparent)';

	const textureImage =
		'radial-gradient(circle at 18% 22%, rgba(255,255,255,.35) 0 1px, transparent 1px 7px), radial-gradient(circle at 62% 68%, rgba(0,0,0,.24) 0 1px, transparent 1px 9px), repeating-linear-gradient(110deg, rgba(255,255,255,.18) 0 1px, rgba(0,0,0,.1) 1px 2px, transparent 2px 7px)';
</script>

<div class="z-10 group [perspective:900px] w-min h-min">
	<div
		style="width: {sizeMap[size].width}; border-radius: 6px 4px 4px 6px;"
		class="transition-transform duration-300 ease-out relative [transform-style:preserve-3d] [transform:rotateY(0deg)] group-hover:[transform:rotateY(-20deg)] group-hover:scale-[1.066] group-hover:-translate-x-1 aspect-[49/60]"
	>
		<!-- Front Side -->
		<div
			class={cn(
				"absolute inset-y-0 overflow-hidden size-full left-0 flex flex-col p-[12%] after:content-[''] after:absolute after:inset-0 after:shadow-[0_1.8px_3.6px_#0000000d,_0_10.8px_21.6px_#00000014,_inset_0_-.9px_#0000001a,_inset_0_1.8px_1.8px_#ffffff1a,_inset_3.6px_0_3.6px_#0000001a] after:pointer-events-none after:rounded-[inherit] after:border-[#00000014] after:border after:border-solid",
				className || defaultColorClasses
			)}
			style="transform: translateZ(25px); border-radius: 6px 4px 4px 6px;"
		>
			<div
				class="absolute left-0 top-0 h-full opacity-40"
				style="min-width: 8.2%; background: {spineHighlight};"
			></div>
			<div class="pl-1 h-full">
				{#if children}
					{@render children()}
				{/if}
			</div>
			{#if textured}
				<div
					class="absolute inset-0 mix-blend-hard-light rotate-180 opacity-50 brightness-110 bg-no-repeat bg-cover pointer-events-none"
					style="border-radius: 6px 4px 4px 6px; background-image: {textureImage};"
				></div>
			{/if}
		</div>

		<!-- Spine -->
		<div
			class="absolute left-0 bg-[linear-gradient(90deg,#eaeaea_0%,#0000_80%),linear-gradient(#fff,#fafafa)]"
			style="top: 3px; bottom: 3px; width: 48px; transform: translateX({sizeMap[size].spineTranslation}) rotateY(90deg);"
		></div>

		<!-- Back Side -->
		<div
			class={cn(
				'absolute inset-y-0 overflow-hidden size-full left-0 flex flex-col justify-end p-[12%]',
				className || defaultColorClasses
			)}
			style="transform: translateZ(-25px); border-radius: 6px 4px 4px 6px;"
		></div>
	</div>
</div>
