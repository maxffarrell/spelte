## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/words-stagger
```

## Usage

```svelte
<script>
  import WordsStagger from '$registry/spelte/words-stagger.svelte';
</script>

<WordsStagger text="Your complete platform for the Design." class="text-3xl font-semibold tracking-tight" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text content to animate |
| `delay` | `number` | `0` | Delay before first word animates (seconds) |
| `stagger` | `number` | `0.1` | Delay between each word (seconds) |
| `speed` | `number` | `0.5` | Duration of each word's animation (seconds) |
| `autoStart` | `boolean` | `true` | Auto-start on mount |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `onStart` | `() => void` | — | Callback when animation starts |
| `onComplete` | `() => void` | — | Callback when animation completes |
| `class` | `string` | — | Additional CSS classes |
