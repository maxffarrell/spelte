## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/marquee
```

## Usage

```svelte
<script>
  import Marquee from '$registry/spelte/marquee.svelte';
</script>

<Marquee>
  <div class="mx-6">Content 1</div>
  <div class="mx-6">Content 2</div>
  <div class="mx-6">Content 3</div>
</Marquee>
```

## Examples

### Pause on Hover

```svelte
<Marquee pauseOnHover>
  <div class="mx-6">Item 1</div>
  <div class="mx-6">Item 2</div>
</Marquee>
```

### Vertical Scroll

```svelte
<Marquee direction="up" class="h-40">
  <div class="h-10">Item 1</div>
  <div class="h-10">Item 2</div>
</Marquee>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `20` | Animation duration in seconds |
| `pauseOnHover` | `boolean` | `false` | Pause on hover |
| `direction` | `"left" \| "right" \| "up" \| "down"` | `"left"` | Scroll direction |
| `fade` | `boolean` | `true` | Apply fade gradient at edges |
| `fadeAmount` | `number` | `10` | Fade gradient percentage |
| `class` | `string` | — | Additional CSS classes |
