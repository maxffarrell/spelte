<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CommandPrimitive.ListProps = $props();
</script>

<div
	data-slot="scroll-area-viewport"
	class="no-scrollbar max-h-[min(25rem,calc(100vh-13rem))] overflow-x-hidden overflow-y-auto"
>
	<CommandPrimitive.List
		bind:ref
		data-slot="command-list"
		class={cn("not-empty:scroll-py-2 not-empty:p-2", className)}
		{...restProps}
	/>
</div>
