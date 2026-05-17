## Usage

```svelte
<script>
  import BlurReveal from '$registry/spelte/blur-reveal.svelte';
</script>

<BlurReveal text="Hello, World!" />
```

## Examples

### Speed

~~~svelte
<div class="flex flex-col gap-8">
  <div>
    <p class="font-mono text-sm text-muted-foreground">SLOW (0.5)</p>
    <BlurReveal text="You can just ship things." class="text-2xl font-medium tracking-tight" speedReveal={0.5} />
  </div>
  <div>
    <p class="font-mono text-sm text-muted-foreground">DEFAULT (1)</p>
    <BlurReveal text="You can just ship things." class="text-2xl font-medium tracking-tight" speedReveal={1} />
  </div>
  <div>
    <p class="font-mono text-sm text-muted-foreground">FAST (2)</p>
    <BlurReveal text="You can just ship things." class="text-2xl font-medium tracking-tight" speedReveal={2} />
  </div>
</div>
~~~

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
