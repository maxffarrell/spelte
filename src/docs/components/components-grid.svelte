<script lang="ts">
	import { getDocSchema } from '$lib/doc';
	import type { DocItem } from '$lib/types';

	const schema = getDocSchema();
	const components: DocItem[] = schema
		.filter((section) => section.title !== 'Getting Started')
		.flatMap((section) => section.items);
</script>

<div
	class="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-8 lg:gap-y-6"
>
	{#each components as component}
		<a
			href="/docs/{component.id}"
			class="group block p-4 rounded-lg border border-border hover:border-foreground/20 transition-colors"
		>
			<h2 class="font-medium group-hover:text-foreground transition-colors">
				{component.title}
			</h2>
			<p class="text-sm text-muted-foreground mt-1 line-clamp-2">
				{component.description}
			</p>
		</a>
	{/each}
</div>
