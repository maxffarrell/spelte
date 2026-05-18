<script lang="ts">
	import Info from '@lucide/svelte/icons/info';
	import * as Popover from '$lib/components/ui/popover';

	let { description }: { description: string } = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button
				type="button"
				class="inline-flex size-6 shrink-0 items-center justify-center rounded-md align-middle text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				aria-label="More information"
				{...props}
			>
				<Info class="size-4 text-current" aria-hidden="true" />
			</button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		side="top"
		class="w-auto max-w-96 py-1.5 px-3 text-sm leading-[18px] text-muted-foreground"
	>
		{description}
	</Popover.Content>
</Popover.Root>
