## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/randomized-text.json
```

## Usage

```svelte
<script>
  import RandomizedText from '$registry/spelte/randomized-text.svelte';
</script>

<RandomizedText text="You can just ship things." />
```

## Examples

### Split By

~~~svelte
<div class="flex w-[500px] flex-col items-center justify-start gap-4">
  <div class="flex flex-col items-start gap-1">
    <span class="font-mono text-sm text-muted-foreground">BY CHARACTERS</span>
    <RandomizedText split="chars" class="text-base font-medium tracking-tight" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
  </div>
  <div class="flex flex-col items-start gap-1">
    <span class="font-mono text-sm text-muted-foreground">BY WORDS</span>
    <RandomizedText split="words" class="text-base font-medium tracking-tight" text="You can just ship things." />
  </div>
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Text to display with randomized animation |
| `split` | `"words" \| "chars"` | `"words"` | Split by words or characters |
| `delay` | `number` | `0.2` | Base delay before animation starts |
| `inViewProp` | `boolean` | `false` | Trigger only when in viewport |
| `once` | `boolean` | `true` | Only animate once |
| `class` | `string` | — | Additional CSS classes |
