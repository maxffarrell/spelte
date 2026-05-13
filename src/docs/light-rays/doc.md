## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/light-rays
```

## Usage

```svelte
<script>
  import LightRays from '$registry/spelte/light-rays.svelte';
</script>

<div class="relative h-[300px] w-full">
  <LightRays />
  <div class="relative z-10">Your content here</div>
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intensity` | `number` | `13` | Brightness intensity (0–100) |
| `rays` | `number` | `32` | Number of light rays |
| `reach` | `number` | `16` | How far rays extend |
| `position` | `number` | `50` | Horizontal position of light source (0–100) |
| `radius` | `string` | `"0px"` | Border radius of container |
| `backgroundColor` | `string` | `"#000"` | Background color |
| `animation` | `{ animate: boolean; speed: number }` | `{ animate: true, speed: 10 }` | Animation config |
| `raysColor` | `object` | `{ mode: "single", color: "#639AFF" }` | Color config: single, multi, or random |
| `class` | `string` | — | Additional CSS classes |
