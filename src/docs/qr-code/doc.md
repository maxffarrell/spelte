<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import QrCodeColorsExample from '$lib/components/examples/qr-code/colors.svelte';
</script>

## Examples

<ExampleShell title="Colors" name="qr-code/colors">
	{#snippet preview()}
		<QrCodeColorsExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import QrCode from '$registry/spelte/qr-code.svelte';
</script>

<QrCode value="https://spelte.dev" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text or URL to encode |
| `size` | `number` | `268` | QR code size in pixels |
| `fgColor` | `string` | `"var(--foreground)"` | Foreground color (adapts to theme) |
| `bgColor` | `string` | `"var(--background)"` | Background color (adapts to theme) |
| `errorCorrectionLevel` | `"L" \| "M" \| "Q" \| "H"` | `"M"` | Error correction level |
| `class` | `string` | — | Additional CSS classes |
