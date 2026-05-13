## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/tilt-card
```

## Usage

```svelte
<script>
  import TiltCard from '$registry/spelte/tilt-card.svelte';
</script>

<TiltCard tiltLimit={15} scale={1.05} perspective={1200}>
  <div class="w-80 h-48 rounded-2xl bg-neutral-100 dark:bg-neutral-900 p-6">
    Your content here
  </div>
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
