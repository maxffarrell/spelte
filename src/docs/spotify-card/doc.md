## Installation

```bash
npx shadcn-svelte@latest add https://spelte.dev/r/spotify-card.json
```

Install the required package:

```bash
pnpm add spotify-url-info
```

## Required API Route

This component fetches metadata from `/api/spotify`, so you also need the helper route below in your app.

```ts
// src/routes/api/spotify/+server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import type { Preview, SpotifyUrlInfoModule } from "spotify-url-info";
```

The full server route is included in the registry output at `src/routes/api/spotify/+server.ts`.

## Usage

```svelte
<script lang="ts">
	import SpotifyCard from "$registry/spelte/spotify-card.svelte";
</script>

<div class="max-w-sm">
	<SpotifyCard url="https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp" />
</div>
```

## Notes

- Preview audio is optional and depends on what Spotify exposes for the selected URL.
- The component renders a loading skeleton while the API request is in flight.
- If the request fails, it falls back to an error state instead of rendering partial metadata.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | required | Spotify track, album, playlist, or episode URL sent to the API route for preview metadata. |
| `class` | `string \| undefined` | `undefined` | Custom classes merged onto the root card wrapper. |
