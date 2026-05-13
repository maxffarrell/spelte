<script lang="ts">
	type HorizontalDirection = 'left' | 'center' | 'right';
	type VerticalDirection = 'top' | 'center' | 'bottom';

	interface Props {
		count?: number;
		direction?: { horizontal?: HorizontalDirection; vertical?: VerticalDirection };
		gravity?: number;
		duration?: number;
		scale?: { value?: number; randomize?: boolean; randomVariation?: number };
		rotation?: { value?: number; animate?: boolean };
		style?: string;
		class?: string;
	}

	let {
		count = 1,
		direction = { horizontal: 'center', vertical: 'top' },
		gravity = 0.7,
		duration = 3,
		scale = { value: 1, randomize: false, randomVariation: 0 },
		rotation = { value: 0, animate: false },
		style,
		class: className
	}: Props = $props();

	let containerEl = $state<HTMLDivElement | null>(null);
	let particleContainerEl = $state<HTMLDivElement | null>(null);

	let particleIdCounter = 0;
	let particles: Array<{
		id: number; x: number; y: number; vx: number; vy: number;
		gravity: number; birthTime: number; lifeMs: number;
		scaleStart: number; scaleEnd: number; rotateStart: number; rotateEnd: number;
		element: HTMLDivElement; isDead: boolean;
	}> = [];
	let rafId: number | null = null;
	let rand = () => Math.random();

	function mapLinear(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
		if (inMax === inMin) return outMin;
		return outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
	}

	function createPRNG(seed: number) {
		let s = seed;
		return () => {
			s |= 0; s = (s + 1831565813) | 0;
			let t = Math.imul(s ^ (s >>> 15), 1 | s);
			t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	function getTextWidth(text: string, inp: HTMLInputElement): number {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) return 0;
		const cs = window.getComputedStyle(inp);
		ctx.font = `${cs.fontSize} ${cs.fontFamily}`;
		return ctx.measureText(text).width;
	}

	function getSpawnPosition(input: HTMLInputElement) {
		const container = containerEl;
		if (!container) return null;
		const inputRect = input.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		const cs = window.getComputedStyle(input);
		const paddingLeft = parseInt(cs.paddingLeft, 10) || 0;
		const paddingRight = parseInt(cs.paddingRight, 10) || 0;
		let x = 0;
		if (input.value.length > 0) {
			const tw = getTextWidth(input.value, input);
			const startX = inputRect.left - containerRect.left;
			const maxX = startX + inputRect.width - paddingRight;
			x = Math.min(tw + startX + paddingLeft, maxX);
		} else {
			x = inputRect.left - containerRect.left;
		}
		const y = inputRect.top - containerRect.top + inputRect.height / 2;
		return { x, y };
	}

	function spawnParticles(x: number, y: number) {
		const particlesToSpawn = Math.max(1, Math.min(5, Math.round(count)));
		for (let i = 0; i < particlesToSpawn; i++) {
			const hv = direction.horizontal === 'left' ? -0.4 : direction.horizontal === 'right' ? 0.4 : 0;
			const vv = direction.vertical === 'top' ? -0.7 : direction.vertical === 'bottom' ? 0.7 : 0;
			const vx = mapLinear(hv, -1, 1, -800, 800) + (rand() * 2 - 1) * 300;
			const vy = mapLinear(vv, -1, 1, -800, 800) + (rand() * 2 - 1) * 300;

			const baseScale = scale.value ?? 1;
			let particleScale = baseScale;
			if (scale.randomize && scale.randomVariation) {
				const variation = (scale.randomVariation / 100) * baseScale;
				particleScale = baseScale - variation + rand() * variation * 2;
			}
			const safeScale = Math.max(0.1, Math.min(4, particleScale));

			const baseRot = rotation.value ?? 0;
			let initRot = baseRot, endRot = baseRot;
			if (rotation.animate) {
				initRot = rand() * 360 - 180;
				endRot = initRot + (rand() * 720 - 360);
			}

			const el = document.createElement('div');
			el.style.cssText = 'position:absolute;left:0;top:0;display:flex;align-items:center;justify-content:center;pointer-events:none;will-change:transform,opacity;transform-origin:50% 50%;opacity:1;';
			el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) scale(${safeScale}) rotate(${initRot}deg)`;

			const fallback = document.createElement('div');
			fallback.style.cssText = 'width:16px;height:16px;border-radius:6px;background-color:#6366f1;';
			el.appendChild(fallback);

			particleContainerEl?.appendChild(el);

			particleIdCounter++;
			const p = {
				id: particleIdCounter, x, y, vx, vy,
				gravity: mapLinear(Math.max(-1, Math.min(1, gravity ?? 0.45)), -1, 1, -2000, 2000),
				birthTime: performance.now(),
				lifeMs: duration * 1000,
				scaleStart: safeScale, scaleEnd: safeScale,
				rotateStart: initRot, rotateEnd: endRot,
				element: el, isDead: false
			};
			particles.push(p);

			setTimeout(() => {
				p.isDead = true;
				p.element.parentNode?.removeChild(p.element);
				particles = particles.filter(pp => pp.id !== p.id);
			}, duration * 1000);
		}
	}

	function startAnimationLoop() {
		let last = performance.now();
		function tick(now: number) {
			const dt = Math.min(32, now - last) / 1000;
			last = now;
			const time = performance.now();
			for (const p of particles) {
				if (p.isDead) continue;
				const age = time - p.birthTime;
				if (age >= p.lifeMs) continue;
				const progress = age / p.lifeMs;
				p.vy += p.gravity * dt;
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				const s = mapLinear(progress, 0, 1, p.scaleStart, p.scaleEnd);
				const r = mapLinear(progress, 0, 1, p.rotateStart, p.rotateEnd);
				const opacity = progress > 0.7 ? mapLinear(progress, 0.7, 1, 1, 0) : 1;
				const cs = Math.max(0.1, Math.min(3, s));
				p.element.style.transform = `translate(${p.x}px,${p.y}px) translate(-50%,-50%) scale(${cs}) rotate(${r}deg)`;
				p.element.style.opacity = String(opacity);
			}
			rafId = requestAnimationFrame(tick);
		}
		rafId = requestAnimationFrame(tick);
	}

	$effect(() => {
		const timeBits = (Date.now() & 4294967295) >>> 0;
		const seed = (timeBits ^ (Math.floor(Math.random() * 4294967295) >>> 0)) >>> 0;
		rand = createPRNG(seed);
		startAnimationLoop();

		const container = containerEl;
		if (!container) return;
		const label = container.closest('label');
		const input = label?.querySelector('input');
		if (!input) return;

		function handleInput() {
			const pos = getSpawnPosition(input!);
			if (pos) spawnParticles(pos.x, pos.y);
		}

		input.addEventListener('input', handleInput);

		return () => {
			input.removeEventListener('input', handleInput);
			if (rafId !== null) cancelAnimationFrame(rafId);
			for (const p of particles) p.element.parentNode?.removeChild(p.element);
			particles = [];
		};
	});
</script>

<div
	bind:this={containerEl}
	class={className}
	{style}
	style:position="relative"
	style:width="0px"
	style:height="0px"
	style:overflow="visible"
	style:background-color="transparent"
	style:transform="translateZ(0)"
>
	<div
		bind:this={particleContainerEl}
		style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;"
	></div>
</div>
