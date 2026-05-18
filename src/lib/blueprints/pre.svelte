<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className,
		style,
		...rest
	}: {
		children?: Snippet;
		class?: string;
		style?: string;
		[key: string]: unknown;
	} = $props();
</script>

<div class="relative" data-code-container="true">
	<pre
		{...rest}
		{style}
		class="max-h-80 overflow-x-auto font-mono border {className ?? ''}"
	>
		{#if children}{@render children()}{/if}
	</pre>
</div>
