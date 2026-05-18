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
| `children` | `Snippet` | `required` | The content of the button. |
| `color` | `"default" \| "blue" \| "purple" \| "pink" \| "red" \| "orange" \| "yellow" \| "green" \| "teal" \| "cyan" \| "indigo" \| "violet" \| "rose" \| "amber" \| "lime" \| "sky" \| "slate" \| "gray" \| "zinc" \| "neutral" \| "stone" \| "fuchsia" \| "emerald"` | `"default"` | The color of the button - supports all Tailwind colors. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | The size of the button. |
| `class` | `string \| undefined` | `undefined` | Additional CSS classes to apply. |
