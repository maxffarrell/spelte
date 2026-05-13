## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/slide-up-text
```

## Usage

```svelte
<script>
  import SlideUpText from '$registry/spelte/slide-up-text.svelte';
</script>

<SlideUpText text="Your text here" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text content to animate |
| `split` | `"words" \| "characters"` | `"words"` | How to split the text for animation |
| `delay` | `number` | `0` | Delay before first element animates (seconds) |
| `stagger` | `number` | `0.1` | Delay between each element (seconds) |
| `from` | `"first" \| "last" \| "center"` | `"first"` | Stagger direction |
| `autoStart` | `boolean` | `true` | Auto-start on mount |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `wordClass` | `string` | — | CSS classes for word wrapper |
| `charClass` | `string` | — | CSS classes for character wrapper |
| `onStart` | `() => void` | — | Callback when animation starts |
| `onComplete` | `() => void` | — | Callback when animation completes |
| `class` | `string` | — | Additional CSS classes |
