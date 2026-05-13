## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/shimmer-text
```

## Usage

```svelte
<script>
  import ShimmerText from '$registry/spelte/shimmer-text.svelte';
</script>

<ShimmerText>Shimmer Effect</ShimmerText>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "red" \| "blue" \| "green" \| ...` | `"default"` | Text color variant |
| `duration` | `number` | `1.5` | Shimmer animation duration (seconds) |
| `delay` | `number` | `1.5` | Delay before animation starts (seconds) |
| `class` | `string` | — | Additional CSS classes |
