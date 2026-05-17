## Usage

```svelte
<script>
  import WordsStagger from '$registry/spelte/words-stagger.svelte';
</script>

<WordsStagger text="Your complete platform for the Design." class="text-3xl font-semibold tracking-tight" />
```

## Examples

### Speed

~~~svelte
<div class="flex flex-col gap-8">
  <div>
    <p class="font-mono text-sm text-muted-foreground">SLOW</p>
    <WordsStagger text="You can just ship things." speed={0.5} class="text-xl font-medium" />
  </div>
  <div>
    <p class="font-mono text-sm text-muted-foreground">DEFAULT</p>
    <WordsStagger text="You can just ship things." speed={1} class="text-xl font-medium" />
  </div>
  <div>
    <p class="font-mono text-sm text-muted-foreground">FAST</p>
    <WordsStagger text="You can just ship things." speed={2} class="text-xl font-medium" />
  </div>
</div>
~~~

### Stagger

~~~svelte
<div class="flex flex-col gap-8">
  <WordsStagger text="Short stagger animation" stagger={0.05} class="text-xl font-medium" />
  <WordsStagger text="Longer stagger animation" stagger={0.15} class="text-xl font-medium" />
</div>
~~~

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
