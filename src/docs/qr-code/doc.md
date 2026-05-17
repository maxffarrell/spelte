## Usage

```svelte
<script>
  import QRCode from '$registry/spelte/qr-code.svelte';
</script>

<QRCode value="https://example.com" />
<QRCode value="https://example.com" size={140} />
```

## Examples

### Colors

~~~svelte
<div class="flex flex-wrap items-center justify-center gap-6">
  <div class="w-[105px] rounded-lg border border-input p-2 md:w-[140px] [&_svg]:h-auto [&_svg]:w-full">
    <QRCode value="https://spell.sh" size={140} fgColor="#c2410c" bgColor="var(--background)" />
  </div>
  <div class="w-[105px] rounded-lg border border-input p-2 md:w-[140px] [&_svg]:h-auto [&_svg]:w-full">
    <QRCode value="https://spell.sh" size={140} fgColor="#2563eb" bgColor="var(--background)" />
  </div>
  <div class="w-[105px] rounded-lg border border-input p-2 md:w-[140px] [&_svg]:h-auto [&_svg]:w-full">
    <QRCode value="https://spell.sh" size={140} fgColor="#16a34a" bgColor="var(--background)" />
  </div>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text or URL to encode |
| `size` | `number` | `268` | QR code size in pixels |
| `fgColor` | `string` | `"var(--foreground)"` | Foreground color (adapts to theme) |
| `bgColor` | `string` | `"var(--background)"` | Background color (adapts to theme) |
| `errorCorrectionLevel` | `"L" \| "M" \| "Q" \| "H"` | `"M"` | Error correction level |
| `class` | `string` | — | Additional CSS classes |
