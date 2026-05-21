<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import SpinnerSizeExample from '$lib/components/examples/spinner/size.svelte';
	import SpinnerSpeedExample from '$lib/components/examples/spinner/speed.svelte';
</script>

## Examples

<ExampleShell title="Size" name="spinner/size">
	{#snippet preview()}
		<SpinnerSizeExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Speed" name="spinner/speed">
	{#snippet preview()}
		<SpinnerSpeedExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "md" \| "lg"` | `"md"` | Size variant of the spinner |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Animation speed |
| `class` | `string` | — | Additional CSS classes |
