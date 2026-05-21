<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import MarqueePauseOnHoverExample from '$lib/components/examples/marquee/pause-on-hover.svelte';
</script>

## Examples

<ExampleShell title="Pause on Hover" name="marquee/pause-on-hover">
	{#snippet preview()}
		<MarqueePauseOnHoverExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `20` | Animation duration in seconds |
| `pauseOnHover` | `boolean` | `false` | Pause on hover |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Scroll direction |
| `fade` | `boolean` | `true` | Apply fade gradient at edges |
| `fadeAmount` | `number` | `10` | Fade gradient percentage |
| `class` | `string` | — | Additional CSS classes |
