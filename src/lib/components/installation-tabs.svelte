<script lang="ts">
	import { config } from '$lib/stores';
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	let { item, children }: { item: string; children?: Snippet } = $props();

	let tab = $state<'cli' | 'manual'>('cli');

	type PM = 'pnpm' | 'npm' | 'yarn' | 'bun';
	let pm = $state<PM>($config.packageManager ?? 'pnpm');

	const commands: Record<PM, string> = $derived({
		pnpm: `pnpm dlx shadcn-svelte@latest add @spelte/${item}`,
		npm: `npx shadcn-svelte@latest add @spelte/${item}`,
		yarn: `yarn dlx shadcn-svelte@latest add @spelte/${item}`,
		bun: `bunx --bun shadcn-svelte@latest add @spelte/${item}`,
	});

	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(commands[pm]);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="not-prose w-full">
	<!-- Tab bar -->
	<div class="flex gap-1 mb-0 p-1 bg-transparent">
		{#each ['cli', 'manual'] as t}
			<button
				class={cn(
					'rounded-md px-2 py-1 text-sm transition-all',
					tab === t
						? 'bg-white dark:bg-[#0B0B09] shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)]'
						: 'text-muted-foreground hover:text-foreground'
				)}
				onclick={() => (tab = t as 'cli' | 'manual')}
			>
				{t === 'cli' ? 'CLI' : 'Manual'}
			</button>
		{/each}
	</div>

	{#if tab === 'cli'}
		<div class="relative overflow-hidden rounded-md border bg-muted/30">
			<div class="relative flex items-center gap-2 border-b px-4 py-2.5 bg-background/50">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="size-3.5 text-muted-foreground"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="4 17 10 11 4 5"></polyline>
					<line x1="12" y1="19" x2="20" y2="19"></line>
				</svg>
				<div class="flex gap-0.5 bg-transparent p-0" translate="no">
					{#each ['pnpm', 'npm', 'yarn', 'bun'] as p}
						<button
							class={cn(
								'h-auto rounded-sm px-2 py-1 text-xs font-mono',
								pm === p
									? 'bg-background border border-border'
									: 'text-muted-foreground hover:text-foreground'
							)}
							onclick={() => {
								pm = p as PM;
								config.update((c) => ({ ...c, packageManager: p as PM }));
							}}
						>
							{p}
						</button>
					{/each}
				</div>
				<button
					class="absolute right-2 size-7 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer"
					onclick={copy}
				>
					<span class="sr-only">Copy</span>
					{#if copied}
						<svg
							class="size-3.5 text-emerald-600"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					{:else}
						<svg
							class="size-3.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
						</svg>
					{/if}
				</button>
			</div>
			<div class="bg-background">
				<pre class="px-4 py-3 overflow-x-auto dark:bg-[#0F0F0F] not-prose"><code
						class="font-mono text-sm text-[#032F62] dark:text-[#9ECBFF]">{commands[pm]}</code
					></pre>
			</div>
		</div>
	{:else if children}
		<div class="[&_pre]:my-0">
			{@render children()}
		</div>
	{/if}
</div>
