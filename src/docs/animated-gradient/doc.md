## Usage

```svelte
<script>
  import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';
</script>

<div class="relative min-h-[500px] w-full md:min-h-[350px] flex items-center justify-center">
  <div class="z-10 flex flex-col items-center text-white gap-1">
    <p class="text-4xl font-semibold tracking-tighter">Animated</p>
    <p class="text-4xl font-medium italic font-serif">Gradient</p>
  </div>
  <AnimatedGradient style="z-index: 0;" config={{ preset: 'Prism' }} />
</div>
```

## Examples

### Presets

```svelte
<script>
  import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';

  const presets = ['Lava', 'Prism', 'Plasma', 'Pulse', 'Vortex', 'Mist'];
  let activePreset = $state('Lava');
</script>

<div class="relative min-h-[500px] w-full md:min-h-[350px] flex flex-col">
  <div class="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
    {#each presets as preset}
      <button
        class="px-3 py-1 text-sm font-medium tracking-tight cursor-pointer rounded-full transition-colors {activePreset === preset ? 'bg-white text-black' : 'bg-transparent text-white'}"
        onclick={() => (activePreset = preset)}
      >
        {preset}
      </button>
    {/each}
  </div>

  <div class="z-10 flex flex-col items-center justify-center flex-1 text-white gap-1">
    <p class="text-4xl font-semibold tracking-tighter text-white mix-blend-exclusion">
      {activePreset}
    </p>
  </div>

  <AnimatedGradient style="z-index: 0;" config={{ preset: activePreset }} />
</div>
```

### Custom Configuration

```svelte
<AnimatedGradient
  config={{
    preset: 'custom',
    color1: '#1a1a2e',
    color2: '#16213e',
    color3: '#0f3460',
    rotation: 45,
    speed: 25,
    swirl: 60,
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `{ preset: 'Prism' \| 'Lava' \| 'Plasma' \| 'Pulse' \| 'Vortex' \| 'Mist' \| 'custom' }` | `{ preset: 'Prism' }` | Gradient config — use preset or custom |
| `noise` | `{ opacity: number; scale?: number }` | — | Noise overlay |
| `radius` | `string` | `"0px"` | Border radius |
| `style` | `string` | — | Inline styles for the container |
| `class` | `string` | — | Additional CSS classes |

### Custom Config Options

| Option | Type | Description |
|--------|------|-------------|
| `color1` | `string` | First gradient color |
| `color2` | `string` | Second gradient color |
| `color3` | `string` | Third gradient color |
| `rotation` | `number` | Gradient rotation angle |
| `proportion` | `number` | Blend proportion between colors |
| `scale` | `number` | Gradient scale |
| `speed` | `number` | Animation speed |
| `distortion` | `number` | Distortion amount |
| `swirl` | `number` | Swirl intensity |
| `swirlIterations` | `number` | Number of swirl iterations |
| `softness` | `number` | Edge softness |
| `offset` | `number` | Gradient offset |
| `shape` | `string` | Shape style |
| `shapeSize` | `number` | Shape size |
