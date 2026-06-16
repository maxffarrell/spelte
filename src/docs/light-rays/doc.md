## Usage

```svelte
<script>
	import LightRays from '$registry/spelte/light-rays.svelte';
</script>

<div class="relative h-80 overflow-hidden rounded-lg">
	<LightRays raysColor={{ mode: 'single', color: '#ffffff' }} />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `backgroundColor` | `string` | `"var(--background)"` | Background color |
| `raysColor` | `{ mode: 'single'; color: string } \| { mode: 'multi'; color1: string; color2: string }` | `{ mode: 'single', color: '#ffffff' }` | Color config |
| `style` | `string` | — | Inline styles for the container |
| `class` | `string` | — | Additional CSS classes |
