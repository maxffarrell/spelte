<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import CopyButtonSizeExample from '$lib/components/examples/copy-button/size.svelte';
</script>

## Examples

<ExampleShell title="Size" name="copy-button/size">
	{#snippet preview()}
		<CopyButtonSizeExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import CopyButton from '$registry/spelte/copy-button.svelte';
</script>

<CopyButton value="pnpm dlx shadcn-svelte@latest init" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text to copy to clipboard |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `class` | `string` | — | Additional CSS classes |
| `onclick` | `(e: MouseEvent) => void` | — | Click event handler |
