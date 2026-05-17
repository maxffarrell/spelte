## Usage

```svelte
<script>
  import Tweet from '$registry/spelte/tweet.svelte';
</script>

<Tweet id="1668408059125702661" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | — | Twitter/X post ID to display |
| `class` | `string` | — | Additional CSS classes for the tweet container |
| `showDate` | `boolean` | `true` | Whether to show the tweet date |
| `showLikeButton` | `boolean` | `true` | Whether to show the like button |
| `showCopyLink` | `boolean` | `true` | Whether to show the copy link button |
