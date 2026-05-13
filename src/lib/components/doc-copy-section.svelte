<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronDown, Copy, Check } from 'lucide-svelte';

	let { content, url }: { content: string; url: string } = $props();

	let copied = $state(false);
	let open = $state(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	const menuItems = $derived([
		{
			key: 'markdown',
			label: 'View as Markdown',
			href: `${url}.md`,
			external: true,
		},
		{
			key: 'claude',
			label: 'Open in Claude',
			href: `https://claude.ai/new?q=${encodeURIComponent(`I'm looking at this spelte documentation: https://spelte.dev${url}.\nHelp me understand how to use it.`)}`,
			external: true,
		},
		{
			key: 'chatgpt',
			label: 'Open in ChatGPT',
			href: `https://chatgpt.com?q=${encodeURIComponent(`I'm looking at this spelte documentation: https://spelte.dev${url}.\nHelp me understand how to use it.`)}`,
			external: true,
		},
	]);
</script>

<div class="hidden md:inline-flex -space-x-px rounded-full shadow-none rtl:space-x-reverse mr-2">
	<button
		class="rounded-none border-r-1 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 relative cursor-pointer inline-flex items-center h-8 px-3 text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-l-md border border-border"
		onclick={handleCopy}
	>
		<div class="flex items-center gap-2">
			<div class="relative w-4 h-4">
				<div
					class={cn(
						'absolute inset-0 transition-all duration-200 flex items-center justify-center',
						copied ? 'scale-100 opacity-100 blur-none' : 'scale-70 opacity-0 blur-[2px]'
					)}
				>
					<Check class="h-4 w-4 text-emerald-500" />
				</div>
				<div
					class={cn(
						'absolute inset-0 transition-all duration-200 flex items-center justify-center',
						copied ? 'scale-0 opacity-0 blur-[2px]' : 'scale-100 opacity-100 blur-none'
					)}
				>
					<Copy class="h-4 w-4 text-muted-foreground dark:text-[#b5b5b5]" />
				</div>
			</div>
			<span>Copy this page</span>
		</div>
	</button>

	<div class="relative">
		<button
			class="cursor-pointer size-8 shadow-none rounded-r-md border border-l-0 border-border bg-secondary hover:bg-secondary/80 flex items-center justify-center"
			onclick={() => (open = !open)}
			aria-label="Open options"
		>
			<ChevronDown class="size-4" />
		</button>

		{#if open}
			<div
				class="absolute right-0 top-full mt-1 w-48 rounded-md border border-border bg-popover shadow-md z-50"
			>
				{#each menuItems as item}
					<a
						href={item.href}
						target={item.external ? '_blank' : undefined}
						rel={item.external ? 'noopener noreferrer' : undefined}
						class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
						onclick={() => (open = false)}
					>
						{item.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if open}
	<div
		class="fixed inset-0 z-40"
		role="presentation"
		onclick={() => (open = false)}
	></div>
{/if}
