## Usage

The `LogosCarousel` accepts a `logos` prop — an array of image metadata.

```svelte
<script>
  import LogosCarousel from '$registry/spelte/logos-carousel.svelte';

  const logos = [
    { src: '/logos/vercel.svg', alt: 'Vercel logo' },
    { src: '/logos/google.svg', alt: 'Google logo' },
    { src: '/logos/framer.svg', alt: 'Framer logo' },
    { src: '/logos/discord.svg', alt: 'Discord logo' },
    { src: '/logos/openai.svg', alt: 'OpenAI logo' },
    { src: '/logos/phantom.svg', alt: 'Phantom logo' },
    { src: '/logos/descript.svg', alt: 'Descript logo' },
    { src: '/logos/netflix.svg', alt: 'Netflix logo' },
    { src: '/logos/linear.svg', alt: 'Linear logo' },
    { src: '/logos/notion.svg', alt: 'Notion logo' },
    { src: '/logos/shopify.svg', alt: 'Shopify logo' },
    { src: '/logos/duolingo.svg', alt: 'Duolingo logo' },
    { src: '/logos/ramp.svg', alt: 'Ramp logo' },
    { src: '/logos/tesla.svg', alt: 'Tesla logo' },
    { src: '/logos/opensea.svg', alt: 'OpenSea logo' },
    { src: '/logos/cursor.svg', alt: 'Cursor logo' }
  ];
</script>

<LogosCarousel
  {logos}
  count={4}
  class="gap-6 sm:gap-10"
/>
```

## Examples

### Logo Count

Limit the number of logos displayed per row.

```svelte
<script>
  import LogosCarousel from '$registry/spelte/logos-carousel.svelte';

  const logos = [
    { src: '/logos/vercel.svg', alt: 'Vercel logo' },
    { src: '/logos/google.svg', alt: 'Google logo' },
    { src: '/logos/framer.svg', alt: 'Framer logo' },
    { src: '/logos/discord.svg', alt: 'Discord logo' },
    { src: '/logos/openai.svg', alt: 'OpenAI logo' },
    { src: '/logos/phantom.svg', alt: 'Phantom logo' }
  ];
</script>

<LogosCarousel
  {logos}
  count={6}
  class="gap-6 sm:gap-10"
/>
```

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
