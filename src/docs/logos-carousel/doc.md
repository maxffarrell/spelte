<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import LogosCarouselCountExample from '$lib/components/examples/logos-carousel/count.svelte';
</script>

## Usage

```svelte
<script>
	import LogosCarousel from '$registry/spelte/logos-carousel.svelte';

	const logos = [
		{ src: '/logos/vercel.svg', alt: 'Vercel logo' },
		{ src: '/logos/google.svg', alt: 'Google logo' },
		{ src: '/logos/framer.svg', alt: 'Framer logo' },
		{ src: '/logos/discord.svg', alt: 'Discord logo' }
	];
</script>

<LogosCarousel {logos} count={4} />
```

## Examples

### Logo Count

Limit the number of logos displayed per row.

<ExampleShell title="Logo Count">
	{#snippet preview()}
		<LogosCarouselCountExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logos` | `{ src: string; alt: string }[]` | — | Logo images to display |
| `count` | `number` | — | Logos per group (defaults to all) |
| `stagger` | `number` | `0.14` | Delay between logo animations (seconds) |
| `duration` | `number` | `600` | Animation duration (ms) |
| `interval` | `number` | `2500` | Time between transitions (ms) |
| `initialDelay` | `number` | `500` | Initial delay before first transition (ms) |
| `class` | `string` | — | Additional CSS classes for the flex container |
