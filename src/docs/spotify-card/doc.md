## Installation

```bash
pnpm dlx shadcn-svelte@latest add @spelte/spotify-card
```

## API Route

This component fetches Spotify metadata from `/api/spotify?url=...`. Create the endpoint in your SvelteKit app:

`src/routes/api/spotify/+server.ts`

```ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
// @ts-expect-error no types available
import spotifyUrlInfo from 'spotify-url-info';

const { getPreview } = spotifyUrlInfo(fetch);

export const GET: RequestHandler = async ({ url }) => {
  const spotifyUrl = url.searchParams.get('url');
  if (!spotifyUrl) return json({ error: 'URL required' }, { status: 400 });

  try {
    const data = await getPreview(spotifyUrl.replace(/\/intl-[a-z]{2}\//, '/'));
    return json(data);
  } catch {
    return json({ error: 'Failed to fetch' }, { status: 500 });
  }
};
```

## Usage

```svelte
<script>
  import SpotifyCard from '$registry/spelte/spotify-card.svelte';
</script>

<SpotifyCard url="https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | — | Spotify track, album, or playlist URL |
| `class` | `string` | — | Additional CSS classes |
