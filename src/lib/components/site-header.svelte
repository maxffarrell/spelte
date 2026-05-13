<script lang="ts">
	import SpelteLogo from '$lib/components/spelte-logo.svelte';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import MobileNav from '$lib/components/mobile-nav.svelte';
	import CommandMenu from '$lib/components/command-menu.svelte';
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
					<h1 class="hidden md:inline font-medium text-nowrap" translate="no">Spelte</h1>
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
			</nav>
		</div>
		<div class="flex gap-2 lg:gap-3 items-center">
			{#if docSchema}
				<CommandMenu {docSchema} />
			{/if}
			<ThemeToggle />
		</div>
	</div>
</header>
