<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import SiteFooter from '$lib/components/site-footer.svelte';
</script>

<div class="flex min-h-dvh flex-col pt-14">
	<SiteHeader />
	<main class="container flex flex-1 items-center justify-center py-24">
		<div class="mx-auto flex max-w-sm flex-col items-center gap-3 text-center">
			<h1 class="text-3xl font-semibold tracking-tight">Sign in</h1>
			<p class="text-sm leading-6 text-muted-foreground">
				Accounts are not available for this Svelte port yet.
			</p>
		</div>
	</main>
	<SiteFooter />
</div>
