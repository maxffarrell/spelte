<script>
	import FallbackAvatar from '$registry/spelte/fallback-avatar.svelte';
</script>

<div class="flex items-center gap-3">
	{#each ['xxtomm', 'max', 'hugh', 'diana', 'solo'] as name}
		<div class="flex flex-col items-center gap-1">
			<FallbackAvatar class="border" {name} size={32} />
			<span class="text-[11px] text-muted-foreground">{name}</span>
		</div>
	{/each}
</div>
