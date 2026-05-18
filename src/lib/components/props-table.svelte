<script lang="ts">
	import PropDescriptionTooltip from '$lib/components/prop-description-tooltip.svelte';

	type PropsTableItem = {
		name: string;
		nameDetails?: string;
		type: string;
		typeDetails?: string;
		default?: string;
		defaultDetails?: string;
	};

	let { data }: { data: PropsTableItem[] } = $props();
</script>

{#if data.length === 0}
	<div
		class="mt-6 flex h-[42px] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30"
	>
		<div class="text-center text-sm text-muted-foreground">No Additional Props</div>
	</div>
{:else}
	<div class="not-prose mt-6 w-full overflow-x-auto rounded-lg border border-border">
		<table class="w-full">
			<thead class="border-b border-border bg-muted/30 text-left">
				<tr>
					<th class="px-4 py-3 text-sm font-medium text-muted-foreground">Prop</th>
					<th class="px-4 py-3 text-sm font-medium text-muted-foreground">Type</th>
					<th class="px-4 py-3 text-sm font-medium text-muted-foreground">Default</th>
				</tr>
			</thead>
			<tbody>
				{#each data as item, index (item.name)}
					<tr class="text-left {index !== data.length - 1 ? 'border-b border-border' : ''}">
						<td class="px-4 py-3">
							<div class="flex items-center gap-1">
								<code
									class="rounded-md bg-muted/75 px-2 py-0.5 font-mono text-sm text-neutral-600 dark:bg-muted/50 dark:text-neutral-300"
									>{item.name}</code
								>
								{#if item.nameDetails}
									<PropDescriptionTooltip description={item.nameDetails} />
								{/if}
							</div>
						</td>
						<td class="px-4 py-3">
							{#if item.type}
								<div class="flex items-center gap-1">
									<code
										class="rounded-md bg-muted/75 px-2 py-0.5 font-mono text-sm text-neutral-600 dark:bg-muted/50 dark:text-neutral-300"
										>{item.type}</code
									>
									{#if item.typeDetails}
										<PropDescriptionTooltip description={item.typeDetails} />
									{/if}
								</div>
							{:else}
								<span class="text-muted-foreground">-</span>
							{/if}
						</td>
						<td class="px-4 py-3">
							{#if item.default}
								<div class="flex items-center gap-1">
									<code
										class="rounded-md bg-muted/75 px-2 py-0.5 font-mono text-sm text-neutral-600 dark:bg-muted/50 dark:text-neutral-300"
										>{item.default}</code
									>
									{#if item.defaultDetails}
										<PropDescriptionTooltip description={item.defaultDetails} />
									{/if}
								</div>
							{:else}
								<span class="text-muted-foreground">-</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
