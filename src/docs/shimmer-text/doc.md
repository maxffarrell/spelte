<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import ShimmerTextColorExample from '$lib/components/examples/shimmer-text/color.svelte';
</script>

## Examples

<ExampleShell title="Color" name="shimmer-text/color">
	{#snippet preview()}
		<ShimmerTextColorExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import ShimmerText from '$registry/spelte/shimmer-text.svelte';
</script>

<ShimmerText>Shimmering text</ShimmerText>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "red" \| "blue" \| "green" \| ...` | `"default"` | Text color variant |
| `duration` | `number` | `1.5` | Shimmer animation duration (seconds) |
| `delay` | `number` | `1.5` | Delay before animation starts (seconds) |
| `class` | `string` | — | Additional CSS classes |
