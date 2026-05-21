<script lang="ts">
	import Marquee from '$registry/spelte/marquee.svelte';
	const logos = [
	{ src: '/logos/vercel.svg', alt: 'Vercel logo' },
	{ src: '/logos/google.svg', alt: 'Google logo' },
	{ src: '/logos/framer.svg', alt: 'Framer logo' },
	{ src: '/logos/discord.svg', alt: 'Discord logo' }
];
</script>

<Marquee class="flex py-4" pauseOnHover>
    {#each logos as logo (logo.src)}
        <img
            src={logo.src}
            alt={logo.alt}
            class="mx-8 h-16 w-16 object-contain opacity-70 not-dark:invert-100"
        />
    {/each}
</Marquee>
