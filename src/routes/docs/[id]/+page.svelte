<script lang="ts">
	import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-svelte';
	import DocsTableOfContents from '$lib/components/toc.svelte';
	import DocCopySection from '$lib/components/doc-copy-section.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let DocComponent = $state<any>(null);

	$effect(() => {
		import(`../../../docs/${data.id}/doc.md`)
			.then((mod) => {
				DocComponent = mod.default;
			})
			.catch(() => {
				DocComponent = null;
			});
	});
</script>

<div class="container py-8 md:py-12">
	<div
		class="xl:grid xl:grid-cols-[10px_1fr_200px] lg:grid-cols-[0px_1fr_200px] xl:gap-8 max-w-[1600px] mx-auto"
	>
		<div class="hidden xl:block"></div>

		<article class="max-w-4xl prose dark:prose-invert w-full min-w-0">
			<header class="not-prose mb-8">
				<nav class="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
					<a href="/docs/introduction" class="hover:text-foreground transition-colors">Docs</a>
					<span>/</span>
					<span class="text-foreground">{data.item.title}</span>
				</nav>

				<div class="flex items-start justify-between">
					<div class="space-y-2">
						<h1 class="scroll-m-20 text-3xl font-semibold tracking-tighter">
							{data.item.title}
						</h1>
						<p class="text-base text-muted-foreground">
							{data.item.description}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<DocCopySection content={data.rawContent} url="/docs/{data.id}" />
						<button
							class="rounded-full size-8 shadow-none active:scale-[0.97] will-change-transform ease-out duration-150 transition-transform inline-flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:pointer-events-none border border-border"
							disabled={!data.prevDoc}
							onclick={() => data.prevDoc && (window.location.href = `/docs/${data.prevDoc.id}`)}
							title={data.prevDoc?.title}
						>
							<ArrowLeft class="text-muted-foreground size-4" />
						</button>
						<button
							class="rounded-full size-8 shadow-none active:scale-[0.97] will-change-transform ease-out duration-300 transition-colors inline-flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:pointer-events-none border border-border"
							disabled={!data.nextDoc}
							onclick={() => data.nextDoc && (window.location.href = `/docs/${data.nextDoc.id}`)}
							title={data.nextDoc?.title}
						>
							<ArrowRight class="text-muted-foreground size-4" />
						</button>
					</div>
				</div>

				{#if data.item.meta?.docs && data.item.meta.docs.length > 0}
					<div class="flex items-center space-x-2 pt-4">
						{#each data.item.meta.docs as doc}
							<a
								href={doc.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-accent"
							>
								{doc.title}
								<ExternalLink class="w-3 h-3" />
							</a>
						{/each}
					</div>
				{/if}
			</header>

			{#if DocComponent}
				<DocComponent />
			{:else}
				<div class="text-muted-foreground text-sm">
					Documentation for <strong>{data.item.title}</strong> is coming soon.
				</div>
			{/if}

			<nav class="not-prose flex items-center justify-between mt-12 pt-12 border-t">
				{#if data.prevDoc}
					<a
						href="/docs/{data.prevDoc.id}"
						class="max-w-40 flex group flex-col font-medium items-start gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ease-out duration-200"
					>
						<span
							class="transition-colors text-muted-foreground/75 group-hover:text-muted-foreground ease-out duration-200"
							>Previous</span
						>
						<span class="truncate">{data.prevDoc.title}</span>
					</a>
				{:else}
					<div></div>
				{/if}
				{#if data.nextDoc}
					<a
						href="/docs/{data.nextDoc.id}"
						class="max-w-40 flex group flex-col font-medium items-end gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ease-out duration-200"
					>
						<span
							class="transition-colors text-muted-foreground/75 group-hover:text-muted-foreground ease-out duration-200"
							>Next</span
						>
						<span class="truncate">{data.nextDoc.title}</span>
					</a>
				{:else}
					<div></div>
				{/if}
			</nav>
		</article>

		<aside class="hidden xl:block sticky top-[90px] h-fit">
			<DocsTableOfContents toc={data.toc} docId={data.id} />
		</aside>
	</div>
</div>
