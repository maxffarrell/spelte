<script lang="ts">
	import SpotifyCard from '$registry/spelte/spotify-card.svelte';

	const previewAudio =
		'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQQAAAAAAA==';
</script>

<SpotifyCard
	url="https://open.spotify.com/track/0DTSnA1bcVI5niJzoyBPyZ"
	audio={previewAudio}
	class="max-w-[325px] max-h-[100px]"
/>
