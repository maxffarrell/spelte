<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { SidebarProvider, SidebarInset } from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div class="flex">
	<SidebarProvider class="flex flex-col">
		<SiteHeader docSchema={data.docSchema} />
		<div class="3xl:max-w-screen-2xl mx-auto flex w-full pt-14">
			<AppSidebar docSchema={data.docSchema} />
			<SidebarInset>
				{@render children()}
			</SidebarInset>
		</div>
	</SidebarProvider>
</div>
