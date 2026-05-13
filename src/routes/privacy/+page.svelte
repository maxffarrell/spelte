<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import { siteConfig } from '$lib/config';
</script>

<div class="relative flex min-h-dvh flex-col pt-14">
	<SiteHeader />
	<main class="flex flex-1 flex-col px-4 py-12 sm:px-5 sm:py-16 md:px-6">
		<article class="mx-auto w-full max-w-3xl">
			<header class="mb-10">
				<h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Privacy Policy</h1>
				<p class="mt-2 text-sm text-muted-foreground">Last updated: March 25, 2026</p>
			</header>

			<div
				class="flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base"
			>
				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl">Overview</h2>
					<p>
						Spelte (<a href="https://spelte.dev" class="underline underline-offset-4 hover:text-foreground">spelte.dev</a>)
						is an open-source collection of UI components that you can copy and paste into your
						projects. We respect your privacy and collect only what is necessary to run the site.
						This policy explains what data we collect, how we use it, and your rights.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl">Analytics</h2>
					<p>
						We may use analytics tools to understand how the site is used and to monitor performance.
						These tools collect anonymous, aggregated data. No personally identifiable information is
						stored.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
						>Data Sharing</h2
					>
					<p>
						We do not sell, trade, or otherwise transfer your personal information to third parties.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
						>Changes to This Policy</h2
					>
					<p>
						We may update this privacy policy from time to time. Changes will be reflected on this
						page with an updated date.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl">Contact</h2>
					<p>
						If you have questions or concerns about this privacy policy, please reach out on our
						<a
							href={siteConfig.links.discord}
							class="underline underline-offset-4 hover:text-foreground"
							target="_blank"
							rel="noopener noreferrer">Discord server</a
						>.
					</p>
				</section>
			</div>
		</article>
	</main>
</div>
