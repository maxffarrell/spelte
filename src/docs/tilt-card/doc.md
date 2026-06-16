## Usage

```svelte
<script>
	import TiltCard from '$registry/spelte/tilt-card.svelte';
</script>

<TiltCard class="rounded-lg border p-8">
	Hover me
</TiltCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tiltLimit` | `number` | `15` | Maximum tilt angle in degrees |
| `scale` | `number` | `1.05` | Scale factor on hover |
| `perspective` | `number` | `1200` | Perspective distance in pixels |
| `effect` | `"gravitate" \| "evade"` | `"evade"` | Tilt follows cursor or tilts away |
| `spotlight` | `boolean` | `true` | Show spotlight effect on hover |
| `class` | `string` | — | Additional CSS classes |
| `style` | `string` | — | Additional inline styles |
