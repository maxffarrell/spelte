<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';
	import Hero from '$lib/components/hero.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col relative min-h-dvh pt-14">
	<SiteHeader docSchema={data.docSchema} />
	<Hero />
	<SiteFooter />
</div>
