<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import ColorSelectorSizeExample from '$lib/components/examples/color-selector/size.svelte';
	import ColorSelectorCallbackExample from '$lib/components/examples/color-selector/callback.svelte';
</script>

## Examples

<ExampleShell title="Size" name="color-selector/size">
	{#snippet preview()}
		<ColorSelectorSizeExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Callback" name="color-selector/callback">
	{#snippet preview()}
		<ColorSelectorCallbackExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import ColorSelector from '$registry/spelte/color-selector.svelte';

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
</script>

<ColorSelector {colors} defaultValue="blue" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `string[]` | — | Array of color names or hex values |
| `defaultValue` | `string` | — | Initially selected color |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of color circles |
| `name` | `string` | — | Name for hidden form input |
| `onColorSelect` | `(color: string) => void` | — | Callback when color is selected |
| `class` | `string` | — | Additional CSS classes |
