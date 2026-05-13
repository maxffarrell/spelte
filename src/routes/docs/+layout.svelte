<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { SidebarProvider, SidebarInset } from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<SiteHeader docSchema={data.docSchema} />
<SidebarProvider>
	<AppSidebar docSchema={data.docSchema} />
	<SidebarInset class="pt-14 min-w-0">
		{@render children()}
	</SidebarInset>
</SidebarProvider>
