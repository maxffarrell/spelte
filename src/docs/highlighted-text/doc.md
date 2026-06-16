<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import HighlightedTextDirectionExample from '$lib/components/examples/highlighted-text/direction.svelte';
</script>

## Examples

<ExampleShell title="Direction" name="highlighted-text/direction">
	{#snippet preview()}
		<HighlightedTextDirectionExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import HighlightedText from '$registry/spelte/highlighted-text.svelte';
</script>

<HighlightedText>Important update</HighlightedText>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `"left" \| "right" \| "top" \| "bottom"` | `"bottom"` | Direction the highlight slides in from |
| `delay` | `number` | `0` | Animation delay in seconds |
| `inView` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once when `inView` is true |
| `class` | `string` | — | Additional CSS classes |
