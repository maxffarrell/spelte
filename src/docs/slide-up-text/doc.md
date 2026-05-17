## Usage

```svelte
<script>
  import SlideUpText from '$registry/spelte/slide-up-text.svelte';
</script>

<SlideUpText text="Your text here" />
```

## Examples

### Split By

~~~svelte
<div class="flex flex-col gap-8">
  <div>
    <span class="mb-2 font-mono text-sm text-muted-foreground">BY WORDS</span>
    <SlideUpText text="Beautiful animated text" split="words" class="text-xl font-medium" />
  </div>
  <div>
    <span class="mb-2 font-mono text-sm text-muted-foreground">BY CHARACTERS</span>
    <SlideUpText text="You just can ship things." split="characters" stagger={0.02} class="text-xl font-medium" />
  </div>
</div>
~~~

### From

~~~svelte
<div class="flex flex-col gap-8">
  <div>
    <span class="mb-2 font-mono text-sm text-muted-foreground">FROM FIRST</span>
    <SlideUpText text="Animation from first word" from="first" class="text-xl font-medium" />
  </div>
  <div>
    <span class="mb-2 font-mono text-sm text-muted-foreground">FROM LAST</span>
    <SlideUpText text="Animation from last word" from="last" class="text-xl font-medium" />
  </div>
  <div>
    <span class="mb-2 font-mono text-sm text-muted-foreground">FROM CENTER</span>
    <SlideUpText text="Animation from center outward" from="center" class="text-xl font-medium" />
  </div>
</div>
~~~

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
