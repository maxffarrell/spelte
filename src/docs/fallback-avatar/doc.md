<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import FallbackAvatarSizesExample from '$lib/components/examples/fallback-avatar/sizes.svelte';
</script>

## Examples

<ExampleShell title="Sizes" name="fallback-avatar/sizes">
	{#snippet preview()}
		<FallbackAvatarSizesExample />
	{/snippet}
</ExampleShell>

## Usage

```svelte
<script>
	import FallbackAvatar from '$registry/spelte/fallback-avatar.svelte';
</script>

<FallbackAvatar name="Ada Lovelace" size={48} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | — | String used to derive unique colors and blob positions |
| `size` | `number` | `32` | Pixel size of the avatar |
| `animated` | `boolean` | `true` | Blobs orbit and breathe on hover |
| `class` | `string` | — | Additional CSS classes |
