## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/flow-button.json
```

## Usage

```svelte
<script>
  import FlowButton from '$registry/spelte/flow-button.svelte';
</script>

<FlowButton>Click me</FlowButton>
```

## Examples

### Size

~~~svelte
<div class="flex items-center gap-4">
  <FlowButton size="sm">Small</FlowButton>
  <FlowButton size="default">Default</FlowButton>
  <FlowButton size="lg">Large</FlowButton>
</div>
~~~

### Color

~~~svelte
<div class="flex flex-wrap gap-4">
  <FlowButton borderColor="var(--primary)">Primary</FlowButton>
  <FlowButton borderColor="var(--color-red-500)">Red</FlowButton>
  <FlowButton borderColor="var(--color-blue-500)">Blue</FlowButton>
  <FlowButton borderColor="var(--color-purple-500)">Purple</FlowButton>
  <FlowButton borderColor="var(--color-green-500)">Green</FlowButton>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `borderColor` | `string` | `"var(--rotating-border-color)"` | Color of the animated dashed border |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
