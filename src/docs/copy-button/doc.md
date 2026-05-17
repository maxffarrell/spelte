## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/copy-button.json
```

## Usage

```svelte
<script>
  import CopyButton from '$registry/spelte/copy-button.svelte';
</script>

<CopyButton value="Text to copy" />
```

## Examples

### Size

~~~svelte
<div class="flex items-center gap-4">
  <CopyButton value="Small" size="sm" />
  <CopyButton value="Default" />
  <CopyButton value="Large" size="lg" />
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text to copy to clipboard |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `class` | `string` | — | Additional CSS classes |
| `onclick` | `(e: MouseEvent) => void` | — | Click event handler |
