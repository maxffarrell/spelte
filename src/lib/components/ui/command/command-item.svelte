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
		"flex min-h-8 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm data-selected:bg-accent data-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-64",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</CommandPrimitive.Item>
