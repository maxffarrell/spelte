<script lang="ts">
	import '../app.css';
	import { buildOgUrl } from '$lib/metadata';
	import { siteConfig } from '$lib/config';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const image = buildOgUrl();
</script>

<svelte:head>
	<title>{siteConfig.name}</title>
	<meta name="description" content={siteConfig.description} />
	<meta name="keywords" content={siteConfig.keywords.join(', ')} />
	<meta property="og:title" content={siteConfig.name} />
	<meta property="og:description" content={siteConfig.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteConfig.url} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="628" />
	<meta property="og:image:alt" content={siteConfig.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={siteConfig.name} />
	<meta name="twitter:description" content={siteConfig.description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

{@render children()}
