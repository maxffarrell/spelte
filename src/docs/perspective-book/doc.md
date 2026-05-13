## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/perspective-book
```

## Usage

```svelte
<script>
  import PerspectiveBook from '$registry/spelte/perspective-book.svelte';
</script>

<PerspectiveBook>
  <div class="flex flex-col gap-4">
    <h1 class="font-semibold leading-5">Your complete platform for Design.</h1>
  </div>
</PerspectiveBook>
```

## Examples

### Textured

```svelte
<PerspectiveBook class="bg-amber-500" textured>
  <span>Book Title</span>
</PerspectiveBook>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the book |
| `textured` | `boolean` | `false` | Adds a realistic texture overlay |
| `class` | `string` | — | CSS classes for styling the cover (use `bg-*` for color) |
