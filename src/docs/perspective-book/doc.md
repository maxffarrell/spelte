## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/perspective-book.json
```

## Usage

```svelte
<script>
  import PerspectiveBook from '$registry/spelte/perspective-book.svelte';
  import { BookOpen } from '@lucide/svelte';
</script>

<PerspectiveBook>
  <div class="flex flex-col gap-4">
    <h1 class="font-semibold leading-5">
      Your complete platform for the Design.
    </h1>
    <BookOpen class="size-5" />
  </div>
</PerspectiveBook>
```

## Examples

### Textured

```svelte
<script>
  import PerspectiveBook from '$registry/spelte/perspective-book.svelte';
  import { Cog } from '@lucide/svelte';
</script>

<div class="flex flex-wrap gap-8">
  <PerspectiveBook
    class="bg-[#4D4E41] text-yellow-300 justify-start h-full"
    textured
  >
    <div class="flex flex-col h-full justify-between">
      <div class="flex flex-col gap-4">
        <h2 class="font-semibold leading-4">
          The Art of Doing Science and Engineering
        </h2>
        <Cog class="size-5" />
      </div>
      <span class="font-medium text-sm font-serif">
        Richard<br />W. Hamming
      </span>
    </div>
  </PerspectiveBook>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | The content to display inside the book |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the book |
| `textured` | `boolean` | `false` | Adds a realistic texture overlay |
| `class` | `string` | — | CSS classes for styling the cover (use `bg-*` for color) |
