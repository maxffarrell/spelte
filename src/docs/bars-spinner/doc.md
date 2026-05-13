## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/bars-spinner
```

## Usage

```svelte
<script>
  import BarsSpinner from '$registry/spelte/bars-spinner.svelte';
</script>

<BarsSpinner size={20} />
<BarsSpinner size={16} color="rgba(255, 255, 255, 0.65)" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `20` | Size in pixels |
| `color` | `string` | `"currentColor"` | Bar color |
| `class` | `string` | — | Additional CSS classes |
