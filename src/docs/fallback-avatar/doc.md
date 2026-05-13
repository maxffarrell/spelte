## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/fallback-avatar
```

## Usage

```svelte
<script>
  import FallbackAvatar from '$registry/spelte/fallback-avatar.svelte';
</script>

<FallbackAvatar name="username" size={32} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | String used to derive unique colors and blob positions |
| `size` | `number` | `32` | Pixel size of the avatar |
| `animated` | `boolean` | `true` | Blobs orbit and breathe on hover |
| `class` | `string` | — | Additional CSS classes |
