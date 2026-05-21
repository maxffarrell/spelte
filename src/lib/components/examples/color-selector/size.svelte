<script lang="ts">
	import ColorSelector from '$registry/spelte/color-selector.svelte';
	const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
</script>

<div class="flex items-center gap-5">
    <ColorSelector {colors} size="sm" defaultValue="red" />
    <ColorSelector {colors} defaultValue="blue" />
    <ColorSelector {colors} size="lg" defaultValue="green" />
</div>
