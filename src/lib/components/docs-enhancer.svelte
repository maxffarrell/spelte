<script lang="ts">
	import { mount } from 'svelte';
	import { onMount } from 'svelte';
	import PropDescriptionTooltip from '$lib/components/prop-description-tooltip.svelte';

	onMount(() => {
		for (const table of document.querySelectorAll('article table')) {
			const headers = [...table.querySelectorAll('thead th')].map((th) =>
				th.textContent?.trim().toLowerCase()
			);
			if (!headers.includes('prop') || !headers.includes('description')) continue;

			table.classList.add(
				'mt-6',
				'w-full',
				'not-prose',
				'overflow-x-scroll',
				'rounded-lg',
				'border',
				'border-border'
			);

			for (const th of table.querySelectorAll('th')) {
				th.classList.add('px-4', 'py-3', 'text-sm', 'font-medium', 'text-muted-foreground');
			}

			for (const row of table.querySelectorAll('tbody tr')) {
				row.classList.add('text-left', 'border-b', 'border-border');
				const cells = row.querySelectorAll('td');
				const description = cells[3]?.textContent?.trim();
				if (cells[3]) cells[3].remove();

				for (const cell of cells) {
					cell.classList.add('px-4', 'py-3');
					for (const code of cell.querySelectorAll('code')) {
						code.textContent = code.textContent?.replace(/^`|`$/g, '') ?? '';
						code.classList.add(
							'rounded-md',
							'dark:bg-muted/50',
							'bg-muted/75',
							'px-2',
							'py-0.5',
							'font-mono',
							'text-neutral-600',
							'dark:text-neutral-300',
							'text-sm'
						);
					}
				}

				if (description && cells[0]) {
					const content = document.createElement('div');
					content.className = 'inline-flex items-center gap-1 align-middle';
					while (cells[0].firstChild) content.append(cells[0].firstChild);

					const tooltipMount = document.createElement('span');
					tooltipMount.className = 'inline-flex items-center align-middle';
					content.append(tooltipMount);
					mount(PropDescriptionTooltip, {
						target: tooltipMount,
						props: { description }
					});
					cells[0].append(content);
				}
			}
		}
	});
</script>
