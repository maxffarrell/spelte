## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/pop-button
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

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `"default" \| "blue" \| "purple" \| "pink" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "cyan" \| ...` | `"default"` | Button color |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
