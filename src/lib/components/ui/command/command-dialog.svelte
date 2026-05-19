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
	{#if open}
		<DialogPrimitiveRoot.Portal {...portalProps}>
			<DialogPrimitiveRoot.Overlay
				data-slot="command-dialog-backdrop"
				class="fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 data-open:opacity-100 data-closed:opacity-0"
			/>
			<div
				data-slot="command-dialog-viewport"
				class="fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]"
			>
				<DialogPrimitiveRoot.Content
					bind:ref={contentRef}
					data-slot="command-dialog-popup"
					class={cn(
						"-translate-y-[calc(1.25rem*var(--nested-dialogs))] relative row-start-2 flex max-h-105 min-h-0 w-full min-w-0 max-w-xl scale-[calc(1-0.1*var(--nested-dialogs))] flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-0.1*var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/6%)] data-nested:data-ending-style:translate-y-8 data-nested:data-starting-style:translate-y-8 data-nested-dialog-open:origin-top data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-closed:scale-98 data-closed:opacity-0 **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
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
			</div>
		</DialogPrimitiveRoot.Portal>
	{/if}
</DialogPrimitiveRoot.Root>
