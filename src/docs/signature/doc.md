> Place the [LastoriaBoldRegular.otf](https://spell.sh/LastoriaBoldRegular.otf) font file inside your `static` directory (SvelteKit's public directory).

## Usage

```svelte
<script>
	import Signature from '$registry/spelte/signature.svelte';
</script>

<Signature text="Spelte" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `"Signature"` | Text to convert into a handwriting path |
| `color` | `string` | `"#000"` | Stroke and fill color |
| `fontSize` | `number` | `14` | Font size for glyph conversion |
| `duration` | `number` | `1.5` | Animation duration per character (seconds) |
| `delay` | `number` | `0` | Delay before first character animates (seconds) |
| `inView` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
