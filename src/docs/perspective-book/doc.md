## Usage

```svelte
<script>
	import PerspectiveBook from '$registry/spelte/perspective-book.svelte';
</script>

<PerspectiveBook class="bg-blue-500">
	<span class="text-white">Guide</span>
</PerspectiveBook>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `Snippet` | — | The content to display inside the book |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the book |
| `textured` | `boolean` | `false` | Adds a realistic texture overlay |
| `class` | `string` | — | CSS classes for styling the cover (use `bg-*` for color) |
