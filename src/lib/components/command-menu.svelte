<script lang="ts">
	import { goto } from '$app/navigation';
	import { config } from '$lib/stores';
	import { cn } from '$lib/utils';
	import { Search, CornerDownLeft } from 'lucide-svelte';
	import type { DocSchema } from '$lib/types';
	import { onMount } from 'svelte';

	let { docSchema }: { docSchema: DocSchema } = $props();

	let open = $state(false);
	let query = $state('');
	let highlightedIndex = $state(0);
	let isMac = $state(true);

	onMount(() => {
		isMac = navigator.platform.toUpperCase().includes('MAC');
	});

	type PageItem = {
		value: string;
		label: string;
		url: string;
		isComponent: boolean;
	};

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

	const filtered = $derived(
		query.trim()
			? allItems.filter(
					(i) =>
						i.label.toLowerCase().includes(query.toLowerCase()) ||
						i.value.toLowerCase().includes(query.toLowerCase())
				)
			: allItems
	);

	const highlighted = $derived(filtered[highlightedIndex] ?? null);

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

	function openDialog() {
		open = true;
		query = '';
		highlightedIndex = 0;
	}

	function closeDialog() {
		open = false;
	}

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
			open ? closeDialog() : openDialog();
		}
		if (e.key === 'Escape') closeDialog();
		if (!open) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			highlightedIndex = Math.min(highlightedIndex + 1, filtered.length - 1);
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			highlightedIndex = Math.max(highlightedIndex - 1, 0);
		}
		if (e.key === 'Enter' && highlighted) {
			goto(highlighted.url);
			closeDialog();
		}
		if (e.key === 'c' && (e.metaKey || e.ctrlKey) && highlighted?.isComponent) {
			navigator.clipboard.writeText(copyPayload());
		}
	}

	$effect(() => {
		highlightedIndex = 0;
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<button
	onclick={openDialog}
	class="hidden sm:inline-flex cursor-text items-center gap-2 text-sm text-muted-foreground dark:bg-background dark:hover:bg-input/20 shadow-none h-8 px-3 rounded-md border border-border"
>
	<Search class="size-4" />
	<span class="pr-6 lg:hidden">Search...</span>
	<span class="pr-8 hidden lg:inline">Search documentation...</span>
	<kbd
		class="-me-1 font-mono place-content-center grid dark:shadow-[0_0_0_1px_var(--input)] shadow-[0_0_0_1px_var(--input)] text-foreground font-normal min-h-5 min-w-5 rounded text-xs"
	>
		/
	</kbd>
</button>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 bg-black/32 backdrop-blur-sm"
		role="presentation"
		onclick={closeDialog}
	></div>

	<!-- Dialog -->
	<div
		class="fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(1rem,4vh)] sm:py-[10vh] pointer-events-none"
		role="presentation"
	>
		<div
			class="pointer-events-auto w-full max-w-lg rounded-xl border border-border bg-popover shadow-xl overflow-hidden"
			role="dialog"
			aria-modal="true"
			aria-label="Search documentation"
		>
			<!-- Input -->
			<div class="flex items-center gap-3 border-b border-border px-4 py-3">
				<Search class="size-4 text-muted-foreground shrink-0" />
				<input
					type="text"
					placeholder="Type a command or search..."
					bind:value={query}
					class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					autofocus
				/>
			</div>

			<!-- Results -->
			<div class="max-h-[300px] overflow-y-auto">
				{#if filtered.length === 0}
					<div class="px-4 py-8 text-center text-sm text-muted-foreground">
						The search results could not be found.
					</div>
				{:else}
					{#each filtered as item, i}
						<button
							class={cn(
								'w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors',
								i === highlightedIndex
									? 'bg-accent text-accent-foreground'
									: 'hover:bg-accent/50'
							)}
							onmouseenter={() => (highlightedIndex = i)}
							onclick={() => {
								goto(item.url);
								closeDialog();
							}}
						>
							{item.label}
						</button>
					{/each}
				{/if}
			</div>

			<!-- Footer -->
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
		</div>
	</div>
{/if}
