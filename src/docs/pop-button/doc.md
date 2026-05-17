## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/pop-button.json
```

## Font Setup (Optional)

To use the playful DynaPuff font, add it to your app:

```svelte
<!-- app.html or +layout.svelte -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DynaPuff&display=swap" rel="stylesheet">
```

```css
/* app.css */
:root {
  --font-pop: 'DynaPuff', cursive;
}
```

## Usage

```svelte
<script>
  import PopButton from '$registry/spelte/pop-button.svelte';
</script>

<PopButton color="violet" size="default">Button</PopButton>
```

## Examples

### Color

```svelte
<div class="flex flex-wrap gap-3 font-semibold not-sm:flex-col">
  <PopButton color="default">Button</PopButton>
  <PopButton color="amber">Button</PopButton>
  <PopButton color="purple">Button</PopButton>
</div>
```

### Size

```svelte
<div class="flex flex-wrap items-center gap-4 font-semibold not-sm:flex-col">
  <PopButton size="sm" color="violet">Small</PopButton>
  <PopButton size="default" color="violet">Default</PopButton>
  <PopButton size="lg" color="violet">Large</PopButton>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Content to display inside the button |
| `color` | `"default" \| "blue" \| "purple" \| "pink" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "cyan" \| ...` | `"default"` | Button color |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `onclick` | `(event: MouseEvent) => void` | — | Click event handler |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
