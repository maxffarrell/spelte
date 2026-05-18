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
