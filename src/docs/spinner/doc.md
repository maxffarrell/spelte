## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/spinner
```

## Usage

```svelte
<script>
  import Spinner from '$registry/spelte/spinner.svelte';
</script>

<Spinner />
```

## Examples

### Sizes

```svelte
<Spinner size="sm" />
<Spinner size="default" />
<Spinner size="md" />
<Spinner size="lg" />
```

### Speed

```svelte
<Spinner speed="slow" />
<Spinner speed="normal" />
<Spinner speed="fast" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "md" \| "lg"` | `"md"` | Size variant of the spinner |
| `speed` | `"slow" \| "normal" \| "fast"` | `"normal"` | Animation speed |
| `class` | `string` | — | Additional CSS classes |
