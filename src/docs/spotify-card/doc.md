## Installation

```bash
pnpm dlx shadcn-svelte@latest add https://spelte.dev/r/spotify-card.json
```

## Usage

```svelte
<script>
  import SpotifyCard from '$registry/spelte/spotify-card.svelte';
</script>

<SpotifyCard
  url="https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"
  title="Never Gonna Give You Up"
  artist="Rick Astley"
  image="/spotify-redbone.svg"
/>
```

## Examples

### Multiple Songs w/ Carousel

~~~svelte
<script>
  import SpotifyCard from '$registry/spelte/spotify-card.svelte';

  const tracks = [
    {
      url: 'https://open.spotify.com/track/2OZVskV28xxJjjhQqKTLSg',
      title: 'Sweet Life',
      artist: 'Frank Ocean',
      image: '/spotify-redbone.svg'
    },
    {
      url: 'https://open.spotify.com/track/7tTRFVlFzk6yTnoMcParmi',
      title: 'Lost',
      artist: 'Frank Ocean',
      image: '/spotify-redbone.svg'
    }
  ];
</script>

<div class="flex w-full max-w-[330px] snap-x snap-mandatory overflow-x-auto">
  {#each tracks as track}
    <div class="w-full shrink-0 snap-center">
      <SpotifyCard {...track} />
    </div>
  {/each}
</div>
~~~

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | — | Spotify track, album, or playlist URL |
| `title` | `string` | `Redbone` | Track title |
| `artist` | `string` | `Childish Gambino` | Artist name |
| `image` | `string` | `/spotify-redbone.svg` | Album artwork URL |
| `audio` | `string` | — | Optional preview audio URL |
| `class` | `string` | — | Additional CSS classes |
