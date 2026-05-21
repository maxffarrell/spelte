<script>
	import ColorSelector from '$registry/spelte/color-selector.svelte';

	const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
</script>

<ColorSelector {colors} defaultValue="blue" />
