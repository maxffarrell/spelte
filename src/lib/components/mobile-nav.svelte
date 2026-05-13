<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { DocSchema } from '$lib/types';

	let {
		docSchema,
		class: className,
	}: {
		docSchema: DocSchema;
		class?: string;
	} = $props();

	let open = $state(false);

	function close() {
		open = false;
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="ghost"
				class={cn(
					'h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent',
					className
				)}
				{...props}
			>
				<div class="relative flex h-8 w-4 items-center justify-center">
					<div class="relative size-4">
						<span
							class={cn(
								'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100',
								open ? 'top-[0.45rem] -rotate-45' : 'top-1'
							)}
						></span>
						<span
							class={cn(
								'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100',
								open ? 'top-[0.45rem] rotate-45' : 'top-2.5'
							)}
						></span>
					</div>
					<span class="sr-only">Toggle Menu</span>
				</div>
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class="bg-background/90 no-scrollbar h-(--radix-popover-content-available-height) w-(--radix-popover-content-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
		align="start"
		sideOffset={14}
	>
		<div class="flex flex-col gap-12 overflow-auto px-4 py-6">
			<div class="flex flex-col gap-8">
				<div class="flex flex-col gap-4">
					<div class="text-muted-foreground text-sm font-medium">Site</div>
					<div class="flex flex-col gap-3">
						<a
							href="/docs/introduction"
							onclick={close}
							class={cn(
								'text-2xl font-medium transition-colors',
								$page.url.pathname === '/docs/introduction' && 'text-primary'
							)}
						>
							Docs
						</a>
						<a
							href="/docs/components"
							onclick={close}
							class={cn(
								'text-2xl font-medium transition-colors',
								$page.url.pathname === '/docs/components' && 'text-primary'
							)}
						>
							Components
						</a>
					</div>
				</div>
				{#each docSchema as section}
					<div class="flex flex-col gap-4">
						<div class="text-muted-foreground text-sm font-medium">{section.title}</div>
						<div class="flex flex-col gap-3">
							{#each section.items as item}
								<a
									href={`/docs/${item.id}`}
									onclick={close}
									class={cn(
										'text-2xl font-medium transition-colors',
										$page.url.pathname === `/docs/${item.id}` && 'text-primary'
									)}
								>
									{item.title}
								</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
