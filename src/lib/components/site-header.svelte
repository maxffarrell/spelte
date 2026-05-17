<script lang="ts">
	import SpelteLogo from '$lib/components/spelte-logo.svelte';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import MobileNav from '$lib/components/mobile-nav.svelte';
	import CommandMenu from '$lib/components/command-menu.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { siteConfig } from '$lib/config';
	import type { DocSchema } from '$lib/types';

	let { docSchema }: { docSchema?: DocSchema } = $props();
</script>

<header class="fixed bg-background top-0 left-0 right-0 z-50 w-full border-b border-border">
	<div
		class="flex justify-between w-full h-14 items-center gap-4 3xl:max-w-screen-2xl px-4 mx-auto"
	>
		<div class="flex items-center gap-6">
			<div class="flex items-center gap-3">
				{#if docSchema}
					<div class="md:hidden">
						<MobileNav {docSchema} />
					</div>
				{/if}
				<a href="/" class="flex items-center gap-1.5">
					<SpelteLogo size={24} />
					<h1 class="hidden md:inline font-medium text-nowrap" translate="no">Spell UI</h1>
				</a>
			</div>
			<nav class="hidden md:flex items-center gap-4 md:gap-6 text-sm">
				<a
					href="/docs/introduction"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					Docs
				</a>
				<a
					href="/docs/components"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					Components
				</a>
				<a
					href="https://github.com/sponsors/tomm"
					target="_blank"
					rel="noreferrer"
					class="text-muted-foreground hover:text-foreground transition-colors"
				>
					Sponsor
				</a>
			</nav>
		</div>
		<div class="flex gap-2 lg:gap-3 items-center">
			{#if docSchema}
				<CommandMenu {docSchema} />
			{/if}
			<Button
				variant="ghost"
				size="icon"
				class="hidden size-8 md:inline-flex"
				href={siteConfig.links.github}
				target="_blank"
				rel="noreferrer"
				title="Open Github"
			>
				<svg
					role="img"
					viewBox="0 0 24 24"
					class="size-4"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>GitHub</title>
					<path
						d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
					/>
				</svg>
				<span class="sr-only">Open Github</span>
			</Button>
			<Button
				variant="ghost"
				class="hidden h-8 px-3 text-sm font-normal md:inline-flex"
				href="/sign-in"
			>
				Sign in
			</Button>
			<ThemeToggle />
		</div>
	</div>
</header>
