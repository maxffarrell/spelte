## Examples

### Color

~~~svelte
<div class="flex flex-wrap gap-2">
  <Badge variant="red">Red</Badge>
  <Badge variant="blue">Blue</Badge>
  <Badge variant="green">Green</Badge>
  <Badge variant="yellow">Yellow</Badge>
  <Badge variant="purple">Purple</Badge>
  <Badge variant="pink">Pink</Badge>
  <Badge variant="orange">Orange</Badge>
  <Badge variant="cyan">Cyan</Badge>
  <Badge variant="indigo">Indigo</Badge>
  <Badge variant="violet">Violet</Badge>
  <Badge variant="rose">Rose</Badge>
  <Badge variant="amber">Amber</Badge>
  <Badge variant="lime">Lime</Badge>
  <Badge variant="emerald">Emerald</Badge>
  <Badge variant="sky">Sky</Badge>
  <Badge variant="fuchsia">Fuchsia</Badge>
</div>
~~~

### Size

~~~svelte
<div class="flex items-center gap-4">
  <Badge size="sm">Small</Badge>
  <Badge size="default">Default</Badge>
</div>
~~~

## Usage

```svelte
<script>
  import Badge from '$registry/spelte/badge.svelte';
</script>

<Badge>Default</Badge>
<Badge variant="blue">Blue</Badge>
<Badge size="sm">Small</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | Content to display inside the badge |
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "red" \| "blue" \| "green" \| "yellow" \| "purple" \| "pink" \| "orange" \| "cyan" \| "indigo" \| "violet" \| "rose" \| "amber" \| "lime" \| "emerald" \| "sky" \| "slate" \| "fuchsia"` | `"default"` | Color variant |
| `size` | `"sm" \| "default"` | `"default"` | Size variant |
| `class` | `string` | — | Additional CSS classes |
