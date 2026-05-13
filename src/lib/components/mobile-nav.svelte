<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
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

<div class={cn('relative', className)}>
	<button
		class="h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent flex"
		onclick={() => (open = !open)}
		aria-expanded={open}
		aria-label="Toggle Menu"
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
	</button>

	{#if open}
		<div
			class="fixed inset-x-0 top-14 bg-background/90 h-[calc(100dvh-3.5rem)] overflow-y-auto backdrop-blur duration-100 z-50"
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
					{#each docSchema as section, i}
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
		</div>
	{/if}
</div>
