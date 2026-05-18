<script lang="ts">
	import type { Command as CommandPrimitive, Dialog as DialogPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";
	import Command from "./command.svelte";
	import { Dialog as DialogPrimitiveRoot } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		open = $bindable(false),
		ref = $bindable(null),
		value = $bindable(""),
		title = "Command Palette",
		description = "Search for a command to run...",
		showCloseButton = false,
		portalProps,
		children,
		class: className,
		...restProps
	}: WithoutChildrenOrChild<DialogPrimitive.RootProps> &
		WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
			portalProps?: DialogPrimitive.PortalProps;
			children: Snippet;
			title?: string;
			description?: string;
			showCloseButton?: boolean;
			class?: string;
		} = $props();

	let contentRef = $state<HTMLElement | null>(null);
</script>

<DialogPrimitiveRoot.Root bind:open {...restProps}>
	<DialogPrimitiveRoot.Portal {...portalProps}>
		<DialogPrimitiveRoot.Overlay
			data-slot="dialog-overlay"
			class="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 isolate z-50 bg-black/32 duration-100 supports-backdrop-filter:backdrop-blur-sm"
		/>
		<DialogPrimitiveRoot.Content
			bind:ref={contentRef}
			data-slot="dialog-content"
			class={cn(
				"bg-background text-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 fixed top-[10vh] left-1/2 z-50 flex max-h-105 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-2xl border p-0 text-sm shadow-lg/5 outline-none duration-100 before:absolute before:inset-0 before:-z-10 before:bg-muted/72 sm:w-full",
				className
			)}
		>
			<DialogPrimitiveRoot.Title class="sr-only">{title}</DialogPrimitiveRoot.Title>
			<DialogPrimitiveRoot.Description class="sr-only">
				{description}
			</DialogPrimitiveRoot.Description>
			<Command {...restProps} bind:value bind:ref {children} />
			{#if showCloseButton}
				<DialogPrimitiveRoot.Close class="sr-only">Close</DialogPrimitiveRoot.Close>
			{/if}
		</DialogPrimitiveRoot.Content>
	</DialogPrimitiveRoot.Portal>
</DialogPrimitiveRoot.Root>
