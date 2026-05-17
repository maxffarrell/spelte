## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/fallback-avatar.json
```

## Usage

```svelte
<script>
  import FallbackAvatar from '$registry/spelte/fallback-avatar.svelte';
</script>

<FallbackAvatar name="username" size={32} />
```

## Examples

### Sizes

~~~svelte
<div class="flex items-end gap-3">
  {#each [20, 28, 36, 44] as size}
    <div class="flex flex-col items-center gap-1">
      <FallbackAvatar class="border" name="spelte" {size} />
      <span class="text-[11px] text-muted-foreground">{size}px</span>
    </div>
  {/each}
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | String used to derive unique colors and blob positions |
| `size` | `number` | `32` | Pixel size of the avatar |
| `animated` | `boolean` | `true` | Blobs orbit and breathe on hover |
| `class` | `string` | — | Additional CSS classes |
