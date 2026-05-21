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
