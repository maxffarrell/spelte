<script lang="ts">
	import Info from '@lucide/svelte/icons/info';
	import * as Popover from '$lib/components/ui/popover';

	let { description }: { description: string } = $props();
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				type="button"
				class="text-foreground/70 hover:text-foreground hover:bg-accent inline-flex shrink-0 items-center justify-center rounded-md p-1 align-middle transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				aria-label="More info"
			>
				<Info class="text-muted-foreground size-4" aria-hidden="true" />
			</button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		side="top"
		sideOffset={8}
		class="border-border bg-card text-foreground w-72 rounded-lg border p-2 text-sm leading-normal shadow-lg"
	>
		{description}
	</Popover.Content>
</Popover.Root>
