## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/color-selector
```

## Usage

```svelte
<script>
  import ColorSelector from '$registry/spelte/color-selector.svelte';

  let selected = 'blue';
</script>

<ColorSelector
  colors={['red', 'blue', 'green']}
  defaultValue="blue"
  onColorSelect={(color) => (selected = color)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `string[]` | — | Array of color names or hex values |
| `defaultValue` | `string` | — | Initially selected color |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of color circles |
| `name` | `string` | — | Name for hidden form input |
| `onColorSelect` | `(color: string) => void` | — | Callback when color is selected |
| `class` | `string` | — | Additional CSS classes |
