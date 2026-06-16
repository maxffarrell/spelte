<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import BadgeColorExample from '$lib/components/examples/badge/color.svelte';
	import BadgeSizeExample from '$lib/components/examples/badge/size.svelte';
</script>

## Examples

<ExampleShell title="Color" name="badge/color">
	{#snippet preview()}
		<BadgeColorExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Size" name="badge/size">
	{#snippet preview()}
		<BadgeSizeExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import Badge from '$registry/spelte/badge.svelte';
</script>

<Badge variant="blue">New</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Content to display inside the badge |
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "red" \| "blue" \| "green" \| "yellow" \| "purple" \| "pink" \| "orange" \| "cyan" \| "indigo" \| "violet" \| "rose" \| "amber" \| "lime" \| "emerald" \| "sky" \| "slate" \| "fuchsia"` | `"default"` | Color variant |
| `size` | `"sm" \| "default"` | `"default"` | Size variant |
| `class` | `string` | — | Additional CSS classes |
