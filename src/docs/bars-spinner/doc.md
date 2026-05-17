## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/bars-spinner.json
```

## Usage

```svelte
<script>
  import BarsSpinner from '$registry/spelte/bars-spinner.svelte';
</script>

<BarsSpinner size={20} />
<BarsSpinner size={16} color="rgba(255, 255, 255, 0.65)" />
```

## Examples

### Size

~~~svelte
<div class="flex items-center gap-4">
  <BarsSpinner size={16} />
  <BarsSpinner size={20} />
  <BarsSpinner size={24} />
  <BarsSpinner size={32} />
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `20` | Size in pixels |
| `color` | `string` | `"currentColor"` | Bar color |
| `class` | `string` | — | Additional CSS classes |
