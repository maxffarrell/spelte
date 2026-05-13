<script lang="ts">
	let value = $state('');
	let particles: { id: number; x: number; y: number; vx: number; vy: number; emoji: string; opacity: number }[] = $state([]);
	const emojis = ['🤩', '👾', '😺', '👻', '🎃', '🖤', '🗯️'];
	let nextId = 0;

	function spawn(e: Event) {
		const input = e.target as HTMLInputElement;
		const rect = input.getBoundingClientRect();
		const count = 3;
		for (let i = 0; i < count; i++) {
			const id = nextId++;
			particles = [
				...particles,
				{
					id,
					x: rect.left - rect.left + Math.random() * rect.width,
					y: 0,
					vx: (Math.random() - 0.5) * 80,
					vy: -(Math.random() * 60 + 20),
					emoji: emojis[Math.floor(Math.random() * emojis.length)],
					opacity: 1,
				},
			];
			setTimeout(() => {
				particles = particles.filter((p) => p.id !== id);
			}, 3000);
		}
	}
</script>

<label class="block relative">
	<input
		type="text"
		placeholder="try@spelte.here"
		bind:value
		oninput={spawn}
		class="w-72 p-0 h-10 text-base border-b bg-background font-medium placeholder:font-medium outline-none"
	/>
	<div class="absolute bottom-0 left-0 w-full pointer-events-none" style="height: 0; overflow: visible;">
		{#each particles as p (p.id)}
			<span
				class="absolute text-3xl select-none pointer-events-none"
				style="left: {p.x}px; bottom: 0; transform: translate({p.vx * 0.1}px, {p.vy * 0.1}px); opacity: {p.opacity}; transition: all 3s ease-out;"
			>
				{p.emoji}
			</span>
		{/each}
	</div>
</label>
