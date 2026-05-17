## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/gradient-wave-text.json
```

## Usage

```svelte
<script>
  import GradientWaveText from '$registry/spelte/gradient-wave-text.svelte';
</script>

<GradientWaveText class="text-3xl md:text-5xl font-medium tracking-[-.03em]">
  Just ship things.
</GradientWaveText>
```

## Examples

### Size

~~~svelte
<div class="flex flex-col gap-4 font-medium">
  <GradientWaveText class="text-lg">Beautiful gradient text</GradientWaveText>
  <GradientWaveText class="text-2xl">Beautiful gradient text</GradientWaveText>
  <GradientWaveText class="text-4xl">Beautiful gradient text</GradientWaveText>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `align` | `"left" \| "center" \| "right"` | `"center"` | Text alignment |
| `speed` | `number` | `1` | Animation speed multiplier |
| `paused` | `boolean` | `false` | Pause the animation |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `repeat` | `boolean` | `false` | Repeat animation infinitely |
| `inViewProp` | `boolean` | `false` | Start when element enters viewport |
| `once` | `boolean` | `true` | Only animate once |
| `radial` | `boolean` | `true` | Use radial gradient (false = linear) |
| `bottomOffset` | `number` | `20` | Bottom offset percentage |
| `bandGap` | `number` | `4` | Gap between gradient bands |
| `bandCount` | `number` | `8` | Number of gradient bands |
| `customColors` | `string[]` | — | Custom color array |
| `ariaLabel` | `string` | — | Accessible label for screen readers |
| `class` | `string` | — | Additional CSS classes |
