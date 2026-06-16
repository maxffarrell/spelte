## Usage

```svelte
<script>
	import TextMarquee from '$registry/spelte/text-marquee.svelte';
</script>

{#snippet launch()}
	<span>Launch</span>
{/snippet}

{#snippet scale()}
	<span>Scale</span>
{/snippet}

{#snippet convert()}
	<span>Convert</span>
{/snippet}

{@const items = [launch, scale, convert]}

<TextMarquee {items} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `Snippet[]` | — | Array of snippets to scroll through |
| `speed` | `number` | `1` | Speed multiplier |
| `height` | `number` | `200` | Container height in pixels |
| `prefix` | `Snippet` | — | Optional prefix element |
| `class` | `string` | — | Additional CSS classes |
