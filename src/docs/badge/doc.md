## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/badge
```

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
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "red" \| "blue" \| "green" \| "yellow" \| "purple" \| "pink" \| "orange" \| "cyan" \| "indigo" \| "violet" \| "rose" \| "amber" \| "lime" \| "emerald" \| "sky" \| "slate" \| "fuchsia"` | `"default"` | Color variant |
| `size` | `"sm" \| "default"` | `"default"` | Size variant |
| `class` | `string` | — | Additional CSS classes |
