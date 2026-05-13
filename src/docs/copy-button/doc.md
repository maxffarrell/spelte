## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/copy-button
```

## Usage

```svelte
<script>
  import CopyButton from '$registry/spelte/copy-button.svelte';
</script>

<CopyButton value="Text to copy" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Text to copy to clipboard |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Button size |
| `class` | `string` | — | Additional CSS classes |
| `onclick` | `(e: MouseEvent) => void` | — | Click event handler |
