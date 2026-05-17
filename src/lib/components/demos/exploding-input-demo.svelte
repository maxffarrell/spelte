<script lang="ts">
	import ExplodingInput from '$registry/spelte/exploding-input.svelte';
</script>

<label class="block">
	<input
		type="text"
		placeholder="try@spell.here"
		class="w-72 p-0 h-10 text-base border-b bg-background font-medium placeholder:font-medium outline-none"
	/>
	<ExplodingInput
		class="z-50"
		content={['🤩', '👾', '😺', '👻', '🎃', '🖤', '🗯️']}
		direction={{ horizontal: 'left', vertical: 'top' }}
		gravity={0.5}
		duration={3}
		count={3}
	/>
</label>
