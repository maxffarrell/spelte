## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/rich-button
```

## Usage

```svelte
<script>
  import RichButton from '$registry/spelte/rich-button.svelte';
</script>

<RichButton>Default</RichButton>
<RichButton color="blue">Blue</RichButton>
<RichButton size="lg">Large</RichButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `"default" \| "blue" \| "purple" \| "pink" \| "red" \| "orange" \| "green" \| ...` | `"default"` | Color variant (supports all Tailwind colors) |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size variant |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
