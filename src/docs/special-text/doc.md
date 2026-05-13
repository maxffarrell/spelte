## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/special-text
```

## Usage

```svelte
<script>
  import SpecialText from '$registry/spelte/special-text.svelte';
</script>

<SpecialText text="SPELTE" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to animate with scramble effect |
| `speed` | `number` | `20` | Animation speed in ms (lower = faster) |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
