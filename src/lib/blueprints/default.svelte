<script module>
	// Export element overrides for mdsx to use
	// Add custom components here to override HTML elements, e.g.:
	// export { default as h1 } from './heading.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
