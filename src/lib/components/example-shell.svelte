<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import CodeBlock from '$lib/components/code-block.svelte';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		title,
		source,
		fullBleed = false,
		children
	}: { title: string; source: string; fullBleed?: boolean; children?: Snippet } = $props();

	const triggerClass =
		'rounded-md cursor-pointer data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]';
	const getExampleSourceHtml =
		getContext<() => Record<string, string>>('exampleSourceHtml') ?? (() => ({}));

	const headingId = $derived(
		title
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.trim()
	);
</script>

<h3 id={headingId} class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
	{title}
</h3>
<Tabs.Root value="preview">
	<div class="flex items-center justify-between not-prose">
		<Tabs.List class="bg-transparent">
			<Tabs.Trigger value="preview" class={triggerClass}>Preview</Tabs.Trigger>
			<Tabs.Trigger value="code" class={triggerClass}>Code</Tabs.Trigger>
		</Tabs.List>
	</div>
	<Tabs.Content value="preview">
		<div
			class="flex w-full overflow-hidden border rounded-sm not-prose preview justify-center items-center bg-background text-foreground {fullBleed ? 'min-h-[500px] p-0 md:min-h-[350px]' : 'min-h-64 p-10 md:min-h-80'}"
		>
			{#if children}{@render children()}{/if}
		</div>
	</Tabs.Content>
	<Tabs.Content value="code" class="not-prose [&_pre]:my-0">
		<CodeBlock {source} html={getExampleSourceHtml()[title]} />
	</Tabs.Content>
</Tabs.Root>
