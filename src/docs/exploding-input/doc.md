## Usage

```svelte
<script>
  import ExplodingInput from '$registry/spelte/exploding-input.svelte';
</script>

<label class="block">
  <input
    type="text"
    placeholder="try@spell.here"
    class="w-72 p-0 h-10 text-base border-b bg-background font-medium placeholder:font-medium outline-none"
  />
  <ExplodingInput
    class="z-50"
    content={['🤩', '👾', '😺', '👻', '🎃', '🖤', '🗯️']}
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
| `content` | `string[]` | `[]` | Content to render as particles |
| `count` | `number` | `1` | Particles spawned per keystroke (1–5) |
| `direction` | `{ horizontal, vertical }` | `{ horizontal: 'center', vertical: 'top' }` | Particle direction |
| `gravity` | `number` | `0.7` | Gravity (-1 to 1, negative = upward) |
| `duration` | `number` | `3` | Particle lifetime in seconds |
| `scale` | `{ value, randomize, randomVariation }` | `{ value: 1 }` | Scale config |
| `rotation` | `{ value, animate }` | `{ value: 0 }` | Rotation config |
| `class` | `string` | — | Additional CSS classes |

## Inspiration

- [Lochie on X](https://x.com/lochieaxon)
