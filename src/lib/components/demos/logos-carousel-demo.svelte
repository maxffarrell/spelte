<script>
	import LogosCarousel from '$registry/spelte/logos-carousel.svelte';

	const logoItems = [
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

<LogosCarousel logos={logoItems} count={4} class="gap-6 sm:gap-10" />
