## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/special-text.json
```

## Usage

```svelte
<script>
  import SpecialText from '$registry/spelte/special-text.svelte';
</script>

<SpecialText text="SPELTE" />
```

## Examples

### Speed

~~~svelte
<div class="flex flex-col gap-4">
  <div class="flex items-center gap-4">
    <span class="w-20 font-mono text-sm text-muted-foreground">FAST:</span>
    <SpecialText text="FAST ANIMATION" speed={10} class="text-lg" />
  </div>
  <div class="flex items-center gap-4">
    <span class="w-20 font-mono text-sm text-muted-foreground">DEFAULT:</span>
    <SpecialText text="DEFAULT ANIMATION" speed={5} class="text-lg" />
  </div>
  <div class="flex items-center gap-4">
    <span class="w-20 font-mono text-sm text-muted-foreground">SLOW:</span>
    <SpecialText text="SLOW ANIMATION" speed={2} class="text-lg" />
  </div>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to animate with scramble effect |
| `speed` | `number` | `20` | Animation speed in ms (lower = faster) |
| `delay` | `number` | `0` | Delay before animation starts (seconds) |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
