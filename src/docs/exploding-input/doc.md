## Usage

```svelte
<script>
	import ExplodingInput from '$registry/spelte/exploding-input.svelte';
</script>

<ExplodingInput placeholder="Type something" content={['*', '+', '•']} />
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
