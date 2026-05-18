<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import type { Snippet } from 'svelte';

	let { title, source, children }: { title: string; source: string; children?: Snippet } = $props();

	const triggerClass =
		'rounded-md cursor-pointer data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]';

	function escapeHtml(value: string) {
		return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

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
			class="flex w-full p-10 overflow-hidden border rounded-sm not-prose preview min-h-64 justify-center md:min-h-80 h-full items-center"
		>
			{#if children}{@render children()}{/if}
		</div>
	</Tabs.Content>
	<Tabs.Content value="code" class="[&_pre]:my-0">
		<figure data-rehype-pretty-code-figure class="my-0">
			<pre
				class="shiki max-h-80 overflow-x-auto rounded-sm border bg-background p-4 font-mono text-sm"
				data-language="svelte"
				style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#0f0f0f"
			><code data-language="svelte">{@html escapeHtml(source)}</code></pre>
		</figure>
	</Tabs.Content>
</Tabs.Root>
