<script lang="ts">
	import { config } from '$lib/stores';
	import { cn } from '$lib/utils';
	import CodeBlock from '$lib/components/code-block.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import type { Snippet } from 'svelte';

	let {
		item,
		source = '',
		sourceHtml = '',
		children,
	}: { item: string; source?: string; sourceHtml?: string; children?: Snippet } = $props();

	type PM = 'pnpm' | 'npm' | 'yarn' | 'bun';
	let pm = $state<PM>($config.packageManager ?? 'pnpm');
	const registryUrl = $derived(`https://spelte.dev/r/${item}.json`);

	const commands: Record<PM, string> = $derived({
		pnpm: `pnpm dlx shadcn-svelte@latest add ${registryUrl}`,
		npm: `npx shadcn-svelte@latest add ${registryUrl}`,
		yarn: `yarn dlx shadcn-svelte@latest add ${registryUrl}`,
		bun: `bunx --bun shadcn-svelte@latest add ${registryUrl}`,
	});

	let copied = $state(false);

	async function copy() {
		await navigator.clipboard.writeText(commands[pm]);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="not-prose w-full">
	<Tabs.Root value="cli" class="w-full">
		<Tabs.List class="not-prose bg-transparent">
			<Tabs.Trigger
				value="cli"
				class="rounded-md data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]"
			>
				CLI
			</Tabs.Trigger>
			<Tabs.Trigger
				value="manual"
				class="rounded-md data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]"
			>
				Manual
			</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="cli">
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
									'h-auto rounded-sm border border-transparent px-2 py-1 text-xs font-mono',
									pm === p
										? 'bg-background border-border'
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
					<pre
						class="px-4 py-3 overflow-x-auto dark:bg-[#0F0F0F] not-prose"><code
							class="font-mono text-sm text-[#032F62] dark:text-[#9ECBFF]">{commands[pm]}</code
						></pre>
				</div>
			</div>
		</Tabs.Content>

		<Tabs.Content value="manual" class="[&_pre]:my-0">
			{#if children}
				{@render children()}
			{:else if source}
				<CodeBlock {source} html={sourceHtml} />
			{/if}
		</Tabs.Content>
	</Tabs.Root>
</div>
