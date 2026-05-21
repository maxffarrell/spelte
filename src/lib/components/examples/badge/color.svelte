<script lang="ts">
	import Badge from '$registry/spelte/badge.svelte';
</script>

<div class="flex flex-wrap gap-2">
    {#each ["red", "blue", "green", "yellow", "purple", "pink", "orange", "cyan"] as variant (variant)}
        <Badge variant={variant as any}>{variant}</Badge>
    {/each}
</div>
