<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import RandomizedTextSplitByExample from '$lib/components/examples/randomized-text/split-by.svelte';
</script>

## Examples

<ExampleShell title="Split By" name="randomized-text/split-by">
	{#snippet preview()}
		<RandomizedTextSplitByExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to display with randomized animation |
| `split` | `"words" \| "chars"` | `"words"` | Split by words or characters |
| `delay` | `number` | `0.2` | Base delay before animation starts |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
