## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/exploding-input
```

## Usage

Wrap your `<input>` in a `<label>` and add `ExplodingInput` as a sibling. The component automatically finds the nearest input.

```svelte
<script>
  import ExplodingInput from '$registry/spelte/exploding-input.svelte';
</script>

<label class="block">
  <input
    type="text"
    placeholder="type here..."
    class="w-72 p-0 h-10 text-base border-b bg-background font-medium outline-none"
  />
  <ExplodingInput
    class="z-50"
    direction={{ horizontal: 'left', vertical: 'top' }}
    gravity={0.5}
    duration={3}
    count={3}
  />
</label>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `1` | Particles spawned per keystroke (1–5) |
| `direction` | `{ horizontal, vertical }` | `{ horizontal: 'center', vertical: 'top' }` | Particle direction |
| `gravity` | `number` | `0.7` | Gravity (-1 to 1, negative = upward) |
| `duration` | `number` | `3` | Particle lifetime in seconds |
| `scale` | `{ value, randomize, randomVariation }` | `{ value: 1 }` | Scale config |
| `rotation` | `{ value, animate }` | `{ value: 0 }` | Rotation config |
| `class` | `string` | — | Additional CSS classes |
