<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import SpecialTextSpeedExample from '$lib/components/examples/special-text/speed.svelte';
</script>

## Examples

<ExampleShell title="Speed" name="special-text/speed">
	{#snippet preview()}
		<SpecialTextSpeedExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to animate with scramble effect |
| `speed` | `number` | `20` | Animation speed in ms (lower = faster) |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
