## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/animated-gradient
```

## Usage

```svelte
<script>
  import AnimatedGradient from '$registry/spelte/animated-gradient.svelte';
</script>

<div class="relative h-[300px] w-full">
  <AnimatedGradient config={{ preset: 'Prism' }} />
  <div class="relative z-10">Your content here</div>
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
| `config` | `{ preset: 'Prism' \| 'Ocean' \| 'Sunset' \| 'Forest' \| 'Aurora' \| 'custom' }` | `{ preset: 'Prism' }` | Gradient config — use preset or custom |
| `noise` | `{ opacity: number; scale?: number }` | — | Noise overlay |
| `radius` | `string` | `"0px"` | Border radius |
| `class` | `string` | — | Additional CSS classes |
