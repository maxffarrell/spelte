<script lang="ts">
	import { cn } from '$lib/utils';
	import { ChevronDown, Copy, Check } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	let { content, url }: { content: string; url: string } = $props();

	let copied = $state(false);

	async function handleCopy() {
		await navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => (copied = false), 1500);
	}

	const menuItems = $derived([
		{
			key: 'markdown',
			label: 'View as Markdown',
			href: `${url}.md`,
		},
		{
			key: 'claude',
			label: 'Open in Claude',
			href: `https://claude.ai/new?q=${encodeURIComponent(`I'm looking at this spelte documentation: https://spelte.dev${url}.\nHelp me understand how to use it.`)}`,
		},
		{
			key: 'chatgpt',
			label: 'Open in ChatGPT',
			href: `https://chatgpt.com?q=${encodeURIComponent(`I'm looking at this spelte documentation: https://spelte.dev${url}.\nHelp me understand how to use it.`)}`,
		},
	]);
</script>

<Popover.Root>
	<div class="hidden md:inline-flex -space-x-px rounded-full shadow-none rtl:space-x-reverse mr-2">
		<Button
			class="rounded-none border-r-1 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 relative cursor-pointer"
			variant="secondary"
			size="sm"
			onclick={handleCopy}
		>
			<div class="flex items-center gap-2">
				<div class="relative w-4 h-4">
					<div
						class={cn(
							'absolute inset-0 transition-all duration-200 flex items-center justify-center',
							copied ? 'scale-100 opacity-100 blur-none' : 'scale-70 opacity-0 blur-[2px]'
						)}
					>
						<Check class="h-4 w-4 text-emerald-500" />
					</div>
					<div
						class={cn(
							'absolute inset-0 transition-all duration-200 flex items-center justify-center',
							copied ? 'scale-0 opacity-0 blur-[2px]' : 'scale-100 opacity-100 blur-none'
						)}
					>
						<Copy class="h-4 w-4 text-muted-foreground dark:text-[#b5b5b5]" />
					</div>
				</div>
				<span>Copy this page</span>
			</div>
		</Button>

		<!-- Desktop dropdown -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						class="cursor-pointer rounded-l-none size-8 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 hidden sm:flex"
						variant="secondary"
						size="icon"
						aria-label="Open options"
						{...props}
					>
						<ChevronDown size={16} aria-hidden="true" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" class="w-48">
				{#each menuItems as item}
					<DropdownMenu.Item>
						<a
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2 w-full"
						>
							{item.label}
						</a>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- Mobile popover trigger -->
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					class="rounded-none size-8 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 flex sm:hidden"
					variant="outline"
					size="icon"
					aria-label="Open options"
					{...props}
				>
					<ChevronDown size={16} aria-hidden="true" />
				</Button>
			{/snippet}
		</Popover.Trigger>
	</div>

	<Popover.Content class="w-52" align="start">
		{#each menuItems as item}
			<Button variant="ghost" size="sm" class="w-full justify-start">
				<a
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 w-full"
				>
					{item.label}
				</a>
			</Button>
		{/each}
	</Popover.Content>
</Popover.Root>
