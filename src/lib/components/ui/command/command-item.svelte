<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CommandPrimitive.ItemProps = $props();
</script>

<CommandPrimitive.Item
	bind:ref
	data-slot="command-item"
	class={cn(
		"data-selected:bg-accent data-selected:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex min-h-8 cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-base outline-hidden select-none sm:min-h-7 sm:text-sm data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</CommandPrimitive.Item>
