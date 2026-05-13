<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<ModeWatcher />
<Button
	variant="outline"
	size="icon"
	class="relative size-8 cursor-pointer rounded-full dark:bg-background dark:hover:bg-input/20 shadow-none"
	onclick={toggleMode}
	aria-label="Switch Theme"
>
	<Sun class="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Switch Theme</span>
</Button>
