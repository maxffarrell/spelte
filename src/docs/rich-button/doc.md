<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import RichButtonColorExample from '$lib/components/examples/rich-button/color.svelte';
	import RichButtonSizeExample from '$lib/components/examples/rich-button/size.svelte';
</script>

## Examples

<ExampleShell title="Color" name="rich-button/color">
	{#snippet preview()}
		<RichButtonColorExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Size" name="rich-button/size">
	{#snippet preview()}
		<RichButtonSizeExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | `required` | The content of the button. |
| `color` | `"default" \| "blue" \| "purple" \| "pink" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "cyan" \| "indigo" \| "violet" \| "rose" \| "amber" \| "lime" \| "sky" \| "slate" \| "gray" \| "zinc" \| "neutral" \| "stone" \| "fuchsia" \| "emerald"` | `"default"` | The color of the button - supports all Tailwind colors. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the button. |
| `class` | `string \| undefined` | `undefined` | Additional CSS classes to apply. |
