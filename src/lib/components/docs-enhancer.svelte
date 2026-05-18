<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { mount } from 'svelte';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';
	import PropDescriptionTooltip from '$lib/components/prop-description-tooltip.svelte';

	function enhancePropsTables() {
		for (const table of document.querySelectorAll('article table')) {
			if (table instanceof HTMLElement && table.dataset.propsTableEnhanced === 'true') continue;

			const headers = [...table.querySelectorAll('thead th')].map((th) =>
				th.textContent?.trim().toLowerCase()
			);
			const labelIndex = headers.findIndex((header) =>
				header === 'prop' || header === 'option' || header === 'name'
			);
			const descriptionIndex = headers.indexOf('description');
			if (labelIndex === -1 || descriptionIndex === -1) continue;

			if (table instanceof HTMLElement) table.dataset.propsTableEnhanced = 'true';

			const descriptionHeader = table.querySelector(
				`thead th:nth-child(${descriptionIndex + 1})`
			);
			descriptionHeader?.remove();

			if (!table.parentElement?.dataset.propsTableWrapper) {
				const wrapper = document.createElement('div');
				wrapper.dataset.propsTableWrapper = 'true';
				wrapper.className = 'mt-6 w-full overflow-x-scroll rounded-lg border border-border';
				table.before(wrapper);
				wrapper.append(table);
			}

			table.classList.add(
				'w-full',
				'not-prose',
				'border-collapse',
			);

			for (const th of table.querySelectorAll('th')) {
				th.classList.add('px-4', 'py-3', 'text-sm', 'font-medium', 'text-muted-foreground');
			}

			const rows = [...table.querySelectorAll('tbody tr')];
			for (const [index, row] of rows.entries()) {
				row.classList.add('text-left', 'transition-colors', 'hover:bg-muted/35');
				if (index !== rows.length - 1) {
					row.classList.add('border-b', 'border-border');
				}

				const cells = row.querySelectorAll('td');
				const descriptionCell = cells[descriptionIndex];
				const description = descriptionCell?.textContent?.trim();
				descriptionCell?.remove();

				for (const cell of cells) {
					if (cell === descriptionCell) continue;
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

				if (description && cells[labelIndex]) {
					const content = document.createElement('div');
					content.className = 'inline-flex items-center gap-1 align-middle';
					while (cells[labelIndex].firstChild) content.append(cells[labelIndex].firstChild);

					const tooltipMount = document.createElement('span');
					tooltipMount.className = 'inline-flex items-center align-middle text-muted-foreground';
					content.append(tooltipMount);
					mount(PropDescriptionTooltip, {
						target: tooltipMount,
						props: { description }
					});
					cells[labelIndex].append(content);
				}
			}
		}
	}

	afterNavigate(async () => {
		await tick();
		enhancePropsTables();
	});

	onMount(async () => {
		await tick();
		enhancePropsTables();
	});
</script>
