## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/highlighted-text
```

## Usage

```svelte
<script>
  import HighlightedText from '$registry/spelte/highlighted-text.svelte';
</script>

<p>This is <HighlightedText>highlighted</HighlightedText> text.</p>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `from` | `"left" \| "right" \| "top" \| "bottom"` | `"bottom"` | Direction the highlight slides in from |
| `delay` | `number` | `0` | Animation delay in seconds |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once when `inViewProp` is true |
| `class` | `string` | — | Additional CSS classes |
