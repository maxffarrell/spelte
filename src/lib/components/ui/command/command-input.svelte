<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";
	import SearchIcon from '@lucide/svelte/icons/search';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(""),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div class="py-1.5 ps-1 pe-2.5">
	<div class="relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64">
		<div
			aria-hidden="true"
			class="[&_svg]:-mx-0.5 pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4"
			data-slot="autocomplete-start-addon"
		>
			<SearchIcon />
		</div>
	<CommandPrimitive.Input
		bind:value
		bind:ref
		data-slot="autocomplete-input"
		data-size="lg"
		class={cn(
			"data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=autocomplete-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(8)-1px)] has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-7 border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0 h-9.5 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(8.5)-1px)] leading-9.5 outline-none placeholder:text-muted-foreground/72 sm:h-8.5 sm:leading-8.5",
			className
		)}
		{...restProps}
	/>
	</div>
</div>
