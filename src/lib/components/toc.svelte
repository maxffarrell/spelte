<script lang="ts">
	import { siteConfig } from '$lib/config';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { SquarePen } from '@lucide/svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';

	let {
		toc,
		class: className,
		docId,
		boldActive = true,
	}: {
		toc: { title?: string; url: string; depth: number }[];
		class?: string;
		docId?: string;
		boldActive?: boolean;
	} = $props();

	let activeId = $state<string | null>(null);

	onMount(() => {
		const ids = toc.map((item) => item.url.replace('#', ''));
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			},
			{ rootMargin: '0% 0% -80% 0%' }
		);
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

{#if toc.length > 0}
	<div class={cn('flex flex-col gap-2 p-4 pt-0 text-sm', className)}>
		<p
			class="text-primary bg-background sticky top-0 h-6 mb-2 text-[0.85rem] flex gap-1.5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 items-center"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				class="size-4"
			>
				<line x1="3" y1="6" x2="21" y2="6"></line>
				<line x1="3" y1="12" x2="15" y2="12"></line>
				<line x1="3" y1="18" x2="9" y2="18"></line>
			</svg>
			On This Page
		</p>
		{#each toc as item}
			<a
				href={item.url}
				class={cn(
					'text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.9rem] no-underline transition-colors',
					item.depth === 3 && 'pl-4',
					item.depth === 4 && 'pl-6',
					boldActive && item.url === `#${activeId}` && 'font-medium text-foreground'
				)}
				data-active={item.url === `#${activeId}`}
				data-depth={item.depth}
			>
				{item.title}
			</a>
		{/each}
		<Separator orientation="horizontal" class="my-2" />
		<div class="flex flex-col gap-2">
			{#if docId}
				<a
					href="{siteConfig.links.github}/edit/main/src/docs/{docId}/doc.md"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
				>
					<SquarePen class="size-3" />
					Edit this page
				</a>
			{/if}
			<a
				href={siteConfig.links.x}
				class="transition-colors hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
			>
				<svg role="img" viewBox="0 0 24 24" class="size-3" fill="currentColor">
					<path
						d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
					/>
				</svg>
				<span>Follow @tomm_ui</span>
			</a>
			<a
				href={siteConfig.links.discord}
				target="_blank"
				rel="noopener noreferrer"
				class="transition-colors hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
			>
				<svg role="img" viewBox="0 0 24 24" class="size-3" fill="currentColor">
					<path
						d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.03.052 2.052 1.508 4.041 2.423 5.993 3.029a.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"
					/>
				</svg>
				Join community
			</a>
		</div>
	</div>
{/if}
