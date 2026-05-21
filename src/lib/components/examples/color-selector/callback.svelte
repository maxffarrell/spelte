<script lang="ts">
	import ColorSelector from '$registry/spelte/color-selector.svelte';
	const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
	let selectedColor = $state('purple');
</script>

<div class="flex items-center gap-3">
    <ColorSelector
        {colors}
        defaultValue="purple"
        onColorSelect={(color) => (selectedColor = color)}
    />
    <span class="text-sm text-muted-foreground">
        Selected: {selectedColor}
    </span>
</div>
