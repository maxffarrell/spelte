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
			<div class="absolute left-0 top-0 h-full opacity-40" style="width: 5%; background: linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.05) 60%, transparent);"></div>
			{#if textured}
				<div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,...'); background-size: 100px;"></div>
			{/if}
			{#if children}
				{@render children()}
			{/if}
		</div>

		<!-- Spine -->
		<div
			class="absolute top-0 left-0 h-full bg-neutral-200 dark:bg-[#2a2a2a]"
			style="width: 50px; transform: rotateY(90deg) translateZ(25px) translateX(-25px); border-radius: 2px 0 0 2px;"
		></div>

		<!-- Back Side -->
		<div
			class="absolute inset-0 bg-neutral-200 dark:bg-[#1a1a1a] rounded-[4px_6px_6px_4px]"
			style="transform: translateZ(-25px) rotateY(180deg);"
		></div>
	</div>
</div>
