## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/randomized-text
```

## Usage

```svelte
<script>
  import RandomizedText from '$registry/spelte/randomized-text.svelte';
</script>

<RandomizedText text="You can just ship things." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to display with randomized animation |
| `split` | `"words" \| "chars"` | `"words"` | Split by words or characters |
| `delay` | `number` | `0.2` | Base delay before animation starts |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
