## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/text-marquee
```

## Usage

The `TextMarquee` component accepts an `items` prop — an array of Svelte snippets.

```svelte
<script>
  import TextMarquee from '$registry/spelte/text-marquee.svelte';
</script>

<!-- Pass items as an array of snippets -->
<TextMarquee items={[tomato, apple, carrot, lettuce, onion]}>
  {#snippet tomato()}<p>Tomato</p>{/snippet}
  {#snippet apple()}<p>Apple</p>{/snippet}
  {#snippet carrot()}<p>Carrot</p>{/snippet}
  {#snippet lettuce()}<p>Lettuce</p>{/snippet}
  {#snippet onion()}<p>Onion</p>{/snippet}
</TextMarquee>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Snippet[]` | — | Array of snippets to scroll through |
| `speed` | `number` | `1` | Speed multiplier |
| `height` | `number` | `200` | Container height in pixels |
| `prefix` | `Snippet` | — | Optional prefix element |
| `class` | `string` | — | Additional CSS classes |
