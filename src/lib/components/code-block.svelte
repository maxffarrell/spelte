<script lang="ts">
	let {
		source,
		html = '',
		lang = 'svelte',
		class: className = ''
	}: { source: string; html?: string; lang?: string; class?: string } = $props();

	function escapeHtml(value: string) {
		return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

</script>

{#if html}
	<div class="[&_pre]:my-0 [&_pre]:max-h-80 [&_pre]:overflow-x-auto [&_pre]:rounded-sm [&_pre]:border [&_pre]:bg-background [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm {className}">
		{@html html}
	</div>
{:else}
	<figure data-rehype-pretty-code-figure class="my-0">
		<pre
			class="shiki max-h-80 overflow-x-auto rounded-sm border bg-background p-4 font-mono text-sm {className}"
			data-language={lang}
			style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#0f0f0f"
		><code data-language={lang}>{@html escapeHtml(source)}</code></pre>
	</figure>
{/if}
