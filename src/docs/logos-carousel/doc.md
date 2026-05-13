## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/logos-carousel
```

## Usage

The `LogosCarousel` accepts a `logos` prop — an array of Svelte snippets.

```svelte
<script>
  import LogosCarousel from '$registry/spelte/logos-carousel.svelte';
</script>

<LogosCarousel logos={[logo1, logo2, logo3, logo4, logo5, logo6]} count={4}>
  {#snippet logo1()}<YourLogo1 />{/snippet}
  {#snippet logo2()}<YourLogo2 />{/snippet}
  {#snippet logo3()}<YourLogo3 />{/snippet}
  {#snippet logo4()}<YourLogo4 />{/snippet}
  {#snippet logo5()}<YourLogo5 />{/snippet}
  {#snippet logo6()}<YourLogo6 />{/snippet}
</LogosCarousel>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logos` | `Snippet[]` | — | Logo snippets to display |
| `count` | `number` | — | Logos per group (defaults to all) |
| `stagger` | `number` | `0.14` | Delay between logo animations (seconds) |
| `duration` | `number` | `600` | Animation duration (ms) |
| `interval` | `number` | `2500` | Time between transitions (ms) |
| `initialDelay` | `number` | `500` | Initial delay before first transition (ms) |
| `class` | `string` | — | Additional CSS classes for the flex container |
