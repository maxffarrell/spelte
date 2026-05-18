<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, children }: { id?: string; children?: Snippet } = $props();
</script>

<h2
	{id}
	class="font-heading mt-16 scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0"
>
	{#if children}{@render children()}{/if}
</h2>
