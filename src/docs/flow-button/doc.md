<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import FlowButtonSizeExample from '$lib/components/examples/flow-button/size.svelte';
	import FlowButtonColorExample from '$lib/components/examples/flow-button/color.svelte';
</script>

## Examples

<ExampleShell title="Size" name="flow-button/size">
	{#snippet preview()}
		<FlowButtonSizeExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Color" name="flow-button/color">
	{#snippet preview()}
		<FlowButtonColorExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `borderColor` | `string` | `"var(--rotating-border-color)"` | Color of the animated dashed border |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
