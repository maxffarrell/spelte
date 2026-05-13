## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/qr-code
```

## Usage

```svelte
<script>
  import QRCode from '$registry/spelte/qr-code.svelte';
</script>

<QRCode value="https://example.com" />
<QRCode value="https://example.com" size={140} />
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
