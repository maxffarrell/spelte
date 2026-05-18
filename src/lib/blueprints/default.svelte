<script module>
	export { default as h2 } from './heading-two.svelte';
	export { default as h3 } from './heading-three.svelte';
	export { default as pre } from './pre.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
