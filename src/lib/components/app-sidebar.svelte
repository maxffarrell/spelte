<script lang="ts">
	import { page } from '$app/stores';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { DocSchema } from '$lib/types';

	let { docSchema }: { docSchema: DocSchema } = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Root class="mt-14">
	<Sidebar.Content
		class="max-h-[calc(100vh-100px)] overflow-y-auto"
		style="mask-image: linear-gradient(to bottom, transparent 0, rgba(0,0,0,0.2) 1rem, black 2rem, black calc(100% - 2rem), rgba(0,0,0,0.2) calc(100% - 1rem), transparent 100%);"
	>
		<div class="h-4 shrink-0"></div>
		{#each docSchema as group}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each group.items as item}
							{@const isActive = $page.url.pathname === `/docs/${item.id}`}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									class="data-[active=true]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[active=true]:not-dark:bg-white transition-all"
									{isActive}
									onclick={() => {
										if (sidebar.isMobile) sidebar.toggleSidebar();
									}}
								>
									{#snippet child({ props })}
										<a href={`/docs/${item.id}`} {...props}>{item.title}</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
		<div class="h-4 shrink-0"></div>
	</Sidebar.Content>
</Sidebar.Root>
