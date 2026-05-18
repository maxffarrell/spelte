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

<div data-slot="command-input-wrapper" class="flex items-center gap-2 py-1.5 ps-1 pe-2.5">
	<SearchIcon class="ms-2 size-4 shrink-0 text-muted-foreground" />
	<CommandPrimitive.Input
		bind:value
		bind:ref
		data-slot="command-input"
		class={cn(
			"h-11 w-full border-transparent! bg-transparent! px-0 text-base shadow-none outline-hidden placeholder:text-muted-foreground focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
			className
		)}
		{...restProps}
	/>
</div>
