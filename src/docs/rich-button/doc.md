## Usage

```svelte
<script>
  import RichButton from '$registry/spelte/rich-button.svelte';
</script>

<RichButton>Default</RichButton>
<RichButton color="blue">Blue</RichButton>
<RichButton size="lg">Large</RichButton>
```

## Examples

### Color

~~~svelte
<div class="relative flex gap-4">
  <RichButton color="zinc">Button</RichButton>
  <RichButton color="amber">Button</RichButton>
  <RichButton color="purple">Button</RichButton>
</div>
~~~

### Size

~~~svelte
<div class="flex flex-wrap items-center gap-4">
  <RichButton size="sm">Small</RichButton>
  <RichButton size="default">Default</RichButton>
  <RichButton size="lg">Large</RichButton>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `"default" \| "blue" \| "purple" \| "pink" \| "red" \| "orange" \| "green" \| ...` | `"default"` | Color variant (supports all Tailwind colors) |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size variant |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
