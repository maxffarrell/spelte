<script lang="ts">
	import { goto } from '$app/navigation';
	import { config } from '$lib/stores';
	import { CornerDownLeft, Search } from 'lucide-svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { DocSchema } from '$lib/types';
	import { onMount } from 'svelte';

	let { docSchema }: { docSchema: DocSchema } = $props();

	let open = $state(false);
	let isMac = $state(true);

	onMount(() => {
		isMac = navigator.platform.toUpperCase().includes('MAC');
	});

	type PageItem = { value: string; label: string; url: string; isComponent: boolean };

	const allItems = $derived(
		docSchema.flatMap((group) =>
			group.items.map((item) => ({
				value: item.id,
				label: item.title,
				url: `/docs/${item.id}`,
				isComponent: group.title !== 'Getting Started',
			}))
		)
	);

	let highlighted = $state<PageItem | null>(null);

	const copyPayload = $derived(() => {
		if (!highlighted?.isComponent) return '';
		const pm = $config.packageManager;
		const arg = `@spelte/${highlighted.value}`;
		const cmds: Record<string, string> = {
			pnpm: `pnpm dlx shadcn-svelte@latest add ${arg}`,
			npm: `npx shadcn-svelte@latest add ${arg}`,
			yarn: `yarn dlx shadcn-svelte@latest add ${arg}`,
			bun: `bunx --bun shadcn-svelte@latest add ${arg}`,
		};
		return cmds[pm] ?? cmds.pnpm;
	});

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
			const target = e.target as HTMLElement;
			if (
				target.isContentEditable ||
				target instanceof HTMLInputElement ||
				target instanceof HTMLTextAreaElement
			)
				return;
			e.preventDefault();
			open = !open;
		}
		if (e.key === 'c' && (e.metaKey || e.ctrlKey) && highlighted?.isComponent) {
			navigator.clipboard.writeText(copyPayload());
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Button
	onclick={() => (open = true)}
	variant="outline"
	size="sm"
	class="hidden sm:inline-flex cursor-text items-center gap-2 text-sm text-muted-foreground dark:bg-background dark:hover:bg-input/20 shadow-none"
>
	<Search class="size-4" />
	<span class="pr-6 lg:hidden">Search...</span>
	<span class="pr-8 hidden lg:inline">Search documentation...</span>
	<kbd
		class="-me-1 font-mono place-content-center grid dark:shadow-[0_0_0_1px_var(--input)] shadow-[0_0_0_1px_var(--input)] text-foreground font-normal min-h-5 min-w-5 rounded text-xs"
	>
		/
	</kbd>
</Button>

<Command.Dialog bind:open class="sm:top-[10vh] translate-y-0">
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>The search results could not be found.</Command.Empty>
		{#each docSchema as group}
			<Command.Group heading={group.title}>
				{#each group.items as item}
					<Command.Item
						value={item.id}
						onmouseenter={() =>
							(highlighted = {
								value: item.id,
								label: item.title,
								url: `/docs/${item.id}`,
								isComponent: group.title !== 'Getting Started',
							})}
						onSelect={() => {
							goto(`/docs/${item.id}`);
							open = false;
						}}
					>
						{item.title}
					</Command.Item>
				{/each}
			</Command.Group>
			<Command.Separator />
		{/each}
	</Command.List>
	<div
		class="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground"
	>
		<div class="flex items-center gap-1.5">
			<span class="whitespace-nowrap">Go to Page</span>
			<kbd
				class="font-mono place-content-center grid shadow-[0_0_0_1px_var(--border)] font-normal min-h-4 px-1 rounded text-xs"
			>
				<CornerDownLeft class="size-2.5" />
			</kbd>
		</div>
		{#if highlighted?.isComponent && copyPayload()}
			<div class="flex min-w-0 items-center gap-2">
				<span class="truncate font-mono">{copyPayload()}</span>
				<div class="flex items-center gap-1">
					<span
						class="inline-flex items-center shadow-[0_0_0_1px_var(--border)] font-normal min-h-4 px-1 rounded text-[10px]"
					>
						{isMac ? '⌘' : 'Ctrl'}<span>C</span>
					</span>
				</div>
			</div>
		{:else}
			<div class="flex items-center gap-2">
				<span
					class="place-content-center grid shadow-[0_0_0_1px_var(--border)] font-normal min-h-4 px-1 rounded text-xs"
				>
					Esc
				</span>
			</div>
		{/if}
	</div>
</Command.Dialog>
