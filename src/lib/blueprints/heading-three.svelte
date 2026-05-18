<script lang="ts">
	import type { Snippet } from 'svelte';

	let { id, children }: { id?: string; children?: Snippet } = $props();
</script>

<h3 {id} class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
	{#if children}{@render children()}{/if}
</h3>
