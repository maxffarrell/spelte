## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/blur-reveal
```

## Usage

```svelte
<script>
  import BlurReveal from '$registry/spelte/blur-reveal.svelte';
</script>

<BlurReveal text="Hello, World!" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text content to animate |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `speedReveal` | `number` | `1.5` | Speed of the reveal animation |
| `speedSegment` | `number` | `0.5` | Speed of individual character animations |
| `trigger` | `boolean` | `true` | Controls whether animation plays |
| `inView` | `boolean` | `false` | Trigger only when element enters viewport |
| `onAnimationComplete` | `() => void` | — | Callback when animation completes |
| `onAnimationStart` | `() => void` | — | Callback when animation starts |
| `class` | `string` | — | Additional CSS classes |
