<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import type { DocSchema } from '$lib/types';

	let { docSchema }: { docSchema: DocSchema } = $props();
</script>

<aside class="hidden md:flex flex-col w-56 shrink-0 mt-14 sticky top-14 h-[calc(100vh-3.5rem)]">
	<div
		class="overflow-y-auto max-h-full py-4"
		style="mask-image: linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.2) 1rem, black 2rem, black calc(100% - 2rem), rgba(0,0,0,0.2) calc(100% - 1rem), transparent 100%);"
	>
		<div class="h-4 shrink-0"></div>
		{#each docSchema as group}
			<div class="mb-4 px-2">
				<div class="mb-1 px-2 py-1 text-xs font-medium text-muted-foreground tracking-wide">
					{group.title}
				</div>
				<ul>
					{#each group.items as item}
						{@const isActive = $page.url.pathname === `/docs/${item.id}`}
						<li>
							<a
								href={`/docs/${item.id}`}
								class={cn(
									'block rounded-md px-2 py-1.5 text-sm transition-all',
									isActive
										? 'shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] bg-white dark:bg-[#1a1a1a] font-medium text-foreground'
										: 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
								)}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
		<div class="h-4 shrink-0"></div>
	</div>
</aside>
