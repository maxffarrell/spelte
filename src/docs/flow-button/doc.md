## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/flow-button
```

## Usage

```svelte
<script>
  import FlowButton from '$registry/spelte/flow-button.svelte';
</script>

<FlowButton>Click me</FlowButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `borderColor` | `string` | `"var(--rotating-border-color)"` | Color of the animated dashed border |
| `href` | `string` | — | Renders as `<a>` link when set |
| `class` | `string` | — | Additional CSS classes |
