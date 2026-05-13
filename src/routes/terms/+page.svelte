<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import { siteConfig } from '$lib/config';
</script>

<div class="relative flex min-h-dvh flex-col pt-14">
	<SiteHeader />
	<main class="flex flex-1 flex-col px-4 py-12 sm:px-5 sm:py-16 md:px-6">
		<article class="mx-auto w-full max-w-3xl">
			<header class="mb-10">
				<h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Terms of Service</h1>
				<p class="mt-2 text-sm text-muted-foreground">Last updated: March 25, 2026</p>
			</header>

			<div
				class="flex flex-col gap-8 text-[0.9375rem] leading-relaxed text-foreground/90 sm:text-base"
			>
				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl">About Spelte</h2>
					<p>
						Spelte (<a href="https://spelte.dev" class="underline underline-offset-4 hover:text-foreground">spelte.dev</a>)
						is an open-source collection of UI components that you can copy and paste into your
						projects. The components themselves are released under the <strong>MIT License</strong>,
						meaning you are free to use, copy, modify, and distribute them in your own projects.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
						>Open-Source License</h2
					>
					<p>
						The UI components provided by Spelte are licensed under the MIT License. You may use them
						freely in personal and commercial projects.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
						>Disclaimer of Warranties</h2
					>
					<p>
						Spelte is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties
						of any kind. We do not guarantee that the site or its components will be error-free or
						uninterrupted. You use the components and the site at your own risk.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
						>Limitation of Liability</h2
					>
					<p>
						To the fullest extent permitted by law, Spelte and its maintainers shall not be liable
						for any indirect, incidental, special, consequential, or punitive damages arising from
						your use of the site or its components.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
						>Changes to These Terms</h2
					>
					<p>
						We reserve the right to modify these terms at any time. Changes will be posted on this
						page with an updated date.
					</p>
				</section>

				<section class="flex flex-col gap-3">
					<h2 class="text-lg font-semibold tracking-tight text-foreground sm:text-xl">Contact</h2>
					<p>
						If you have questions about these terms, please reach out on our
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
