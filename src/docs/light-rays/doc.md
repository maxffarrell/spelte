## Usage

```svelte
<script>
  import Rays from '$registry/spelte/light-rays.svelte';
</script>

<div class="relative min-h-[500px] w-full md:min-h-[350px] flex items-center justify-center">
  <Rays backgroundColor="var(--background)" style="z-index: 0;" />
  <div class="z-10 flex h-full text-primary gap-2">
    <p class="text-4xl font-semibold tracking-tighter">Beautiful</p>
    <p class="text-4xl font-medium italic font-serif">Light Rays</p>
  </div>
</div>
```

## Examples

### Multi Color

```svelte
<script>
  import Rays from '$registry/spelte/light-rays.svelte';
</script>

<div class="relative min-h-[500px] w-full md:min-h-[350px] flex items-center justify-center">
  <Rays
    backgroundColor="var(--background)"
    style="z-index: 0;"
    raysColor={{ mode: 'multi', color1: '#2060DF', color2: '#ffffff' }}
  />
  <div class="z-10 flex flex-col items-center h-full gap-2">
    <p class="text-4xl font-semibold tracking-tighter">Multi Colored</p>
    <p class="text-4xl font-medium italic font-serif">Light Rays</p>
  </div>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `"var(--background)"` | Background color |
| `raysColor` | `{ mode: 'single'; color: string } \| { mode: 'multi'; color1: string; color2: string }` | `{ mode: 'single', color: '#ffffff' }` | Color config |
| `style` | `string` | — | Inline styles for the container |
| `class` | `string` | — | Additional CSS classes |
