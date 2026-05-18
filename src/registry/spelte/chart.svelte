<script lang="ts">
	import { cn } from '$lib/utils';

	const VIEWBOX_W = 640, VIEWBOX_H = 220, PAD_X = 0, PAD_Y_TOP = 24, PAD_Y_BOTTOM = 12;
	const LINE_WIDTH = 2, CORNER_RADIUS = 2.5;
	const TRANSITION = '200ms cubic-bezier(0.16, 1, 0.3, 1)';
	const TOOLTIP_SHADOW = '0 0 0 1px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04), 0 4px 16px -4px rgba(0,0,0,0.12), 0 12px 32px -8px rgba(0,0,0,0.08)';
	const DOT_SHADOW = '0 0 0 2px #FFF, 0 0 8px 2px rgba(0,0,0,0.12)';

	interface Props {
		data: number[];
		labels?: string[];
		name?: string;
		color?: string;
		width?: number;
		formatValue?: (value: number, index: number) => string;
		defaultIndex?: number;
		showXAxis?: boolean;
		reveal?: boolean;
		showFill?: boolean;
		showDot?: boolean;
		animated?: boolean;
		tickCount?: number;
		class?: string;
	}

	let {
		data,
		labels,
		name,
		color = '#0090FD',
		width = 640,
		formatValue = (v) => v.toLocaleString(),
		defaultIndex,
		showXAxis = true,
		tickCount = 6,
		reveal = false,
		showFill = true,
		showDot = true,
		animated = true,
		class: className
	}: Props = $props();

	const transition = $derived(animated ? TRANSITION : '0ms');
	const uid = Math.random().toString(36).slice(2);
	const grayFillId = `gf-${uid}`;
	const clipId = `clip-${uid}`;

	let rootEl = $state<HTMLDivElement | null>(null);
	let containerWidth = $state(0);
	let activeIndex = $state(0);
	let initialized = false;

	$effect(() => {
		if (!rootEl) return;
		if (!initialized) {
			initialized = true;
			containerWidth = rootEl.getBoundingClientRect().width || width;
			activeIndex = defaultIndex ?? Math.max(0, data.length - 1);
		}
		const ro = new ResizeObserver((entries) => {
			const w = entries[0]?.contentRect.width;
			if (w) containerWidth = w;
		});
		ro.observe(rootEl);
		return () => ro.disconnect();
	});

	function buildRoundedPath(pts: { x: number; y: number }[], radius: number): string {
		if (pts.length === 0) return '';
		const f = (n: number) => n.toFixed(3);
		if (pts.length === 1) return `M${f(pts[0].x)} ${f(pts[0].y)}`;
		let d = `M${f(pts[0].x)} ${f(pts[0].y)}`;
		for (let i = 1; i < pts.length - 1; i++) {
			const prev = pts[i - 1], curr = pts[i], next = pts[i + 1];
			const inDx = curr.x - prev.x, inDy = curr.y - prev.y;
			const inLen = Math.hypot(inDx, inDy) || 1;
			const outDx = next.x - curr.x, outDy = next.y - curr.y;
			const outLen = Math.hypot(outDx, outDy) || 1;
			const r = Math.min(radius, inLen / 2, outLen / 2);
			const bx = curr.x - (inDx / inLen) * r, by = curr.y - (inDy / inLen) * r;
			const ax = curr.x + (outDx / outLen) * r, ay = curr.y + (outDy / outLen) * r;
			d += ` L${f(bx)} ${f(by)} Q${f(curr.x)} ${f(curr.y)} ${f(ax)} ${f(ay)}`;
		}
		d += ` L${f(pts[pts.length - 1].x)} ${f(pts[pts.length - 1].y)}`;
		return d;
	}

	const points = $derived.by(() => {
		const n = data.length;
		if (n === 0) return [];
		const minV = Math.min(...data), maxV = Math.max(...data);
		const range = maxV - minV || 1;
		const innerW = VIEWBOX_W - 2 * PAD_X, innerH = VIEWBOX_H - PAD_Y_TOP - PAD_Y_BOTTOM;
		return data.map((value, i) => ({
			value, index: i,
			x: PAD_X + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW),
			y: PAD_Y_TOP + (1 - (value - minV) / range) * innerH
		}));
	});

	const strokePath = $derived.by(() => {
		if (points.length === 0) return '';
		return buildRoundedPath(points, CORNER_RADIUS);
	});

	const fillPath = $derived.by(() => {
		if (points.length === 0) return '';
		const stroke = strokePath;
		const last = points[points.length - 1], first = points[0];
		const baseY = VIEWBOX_H - PAD_Y_BOTTOM;
		return `${stroke} L${last.x.toFixed(3)} ${baseY} L${first.x.toFixed(3)} ${baseY} Z`;
	});

	const active = $derived(points[Math.min(activeIndex, points.length - 1)] ?? points[0]);
	const activeXPct = $derived(active ? active.x / VIEWBOX_W : 0);
	const activeYPct = $derived(active ? active.y / VIEWBOX_H : 0);
	const cursorPx = $derived(activeXPct * containerWidth);
	const cursorContainerHeight = $derived((containerWidth * VIEWBOX_H) / VIEWBOX_W);
	const cursorYpx = $derived(activeYPct * cursorContainerHeight);
	const tooltipOnLeft = $derived(activeXPct > 0.5);

	const axisVisible = $derived(showXAxis && !!labels && labels.length > 0);

	const tickIndices = $derived.by(() => {
		if (!axisVisible) return [];
		const n = points.length;
		const maxFit = Math.max(2, Math.floor(containerWidth / 80));
		const count = Math.min(tickCount, maxFit, n);
		if (count <= 1) return [0];
		return Array.from({ length: count }, (_, i) => Math.round((i * (n - 1)) / (count - 1)));
	});

	function onMove(e: MouseEvent) {
		if (!rootEl || points.length === 0) return;
		const rect = rootEl.getBoundingClientRect();
		const rel = (e.clientX - rect.left) / rect.width;
		const innerLeft = PAD_X / VIEWBOX_W, innerRight = (VIEWBOX_W - PAD_X) / VIEWBOX_W;
		const t = (rel - innerLeft) / (innerRight - innerLeft);
		const idx = Math.round(t * (points.length - 1));
		activeIndex = Math.max(0, Math.min(points.length - 1, idx));
	}
</script>

{#if points.length > 0 && active}
	<div
		style="max-width: {width}px; --spell-color: {color};"
		class={cn('w-full select-none [--spell-line:#c7c7c7] [--spell-badge:#e8e8e8] dark:[--spell-line:#4f4f4f] dark:[--spell-badge:#2d2d2d]', className)}
	>
		<div
			bind:this={rootEl}
			onmousemove={onMove}
			role="img"
			aria-label={name ? `${name} chart` : 'Chart'}
			class="relative w-full touch-none"
			style="aspect-ratio: 640/220;"
		>
			<svg width="100%" height="100%" viewBox="0 0 {VIEWBOX_W} {VIEWBOX_H}" fill="none" preserveAspectRatio="xMidYMid meet" style="overflow: visible;">
				<defs>
					<linearGradient id={grayFillId} x1={VIEWBOX_W / 2} y1={PAD_Y_TOP} x2={VIEWBOX_W / 2} y2={VIEWBOX_H} gradientUnits="userSpaceOnUse">
						<stop stop-color="var(--spell-badge)" />
						<stop offset="1" stop-color="var(--spell-badge)" stop-opacity="0" />
					</linearGradient>
					<clipPath id={clipId} clipPathUnits="userSpaceOnUse">
						<rect
							x={0} y={0} width={VIEWBOX_W} height={VIEWBOX_H}
							style="transform: scaleX({activeXPct}); transform-origin: left center; transition: transform {transition};"
						/>
					</clipPath>
				</defs>

				{#if showFill}
					<path d={fillPath} fill="url(#{grayFillId})" />
				{/if}

				{#if reveal}
					<path d={strokePath} stroke="var(--spell-line)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
					<g clip-path="url(#{clipId})">
						<path d={strokePath} stroke="var(--spell-color)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
					</g>
				{:else}
					<path d={strokePath} stroke="var(--spell-color)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
				{/if}
			</svg>

			<div
				class="absolute pointer-events-none rounded-full bg-[var(--spell-line)] left-0"
				style="width: {LINE_WIDTH}px; top: {(PAD_Y_TOP / VIEWBOX_H) * 100}%; height: {((VIEWBOX_H - PAD_Y_TOP - PAD_Y_BOTTOM / 2) / VIEWBOX_H) * 100}%; transform: translate3d({cursorPx - LINE_WIDTH / 2}px, 0, 0); transition: transform {transition}; will-change: transform;"
			></div>

			{#if showDot}
				<div
					class="absolute pointer-events-none w-3 h-3 rounded-full bg-[var(--spell-color)] z-10 left-0 top-0"
					style="transform: translate3d({cursorPx - 6}px, {cursorYpx - 6}px, 0); box-shadow: {DOT_SHADOW}; transition: transform {transition}; will-change: transform;"
				></div>
			{/if}

			<div
				class="absolute pointer-events-none z-20 grid min-w-32 items-start gap-1.5 rounded-lg bg-background px-2.5 py-1.5 text-xs left-0 top-0"
				style="transform: {tooltipOnLeft ? `translate3d(calc(${cursorPx}px - 100% - 12px), calc(${cursorYpx}px - 50%), 0)` : `translate3d(${cursorPx + 12}px, calc(${cursorYpx}px - 50%), 0)`}; transition: transform {transition}; will-change: transform; box-shadow: {TOOLTIP_SHADOW};"
			>
				{#if labels?.[active.index]}
					<div class="font-medium text-foreground">{labels[active.index]}</div>
				{/if}
				<div class="flex w-full items-center gap-2">
					<div class="h-2.5 w-2.5 shrink-0 rounded-[2px]" style="background: {color};"></div>
					<div class="flex flex-1 items-center justify-between gap-3 leading-none">
						{#if name}
							<span class="text-muted-foreground whitespace-nowrap">{name}</span>
						{/if}
						<span class="font-mono font-medium text-foreground tabular-nums ml-auto">
							{formatValue(active.value, active.index)}
						</span>
					</div>
				</div>
			</div>
		</div>

		{#if axisVisible}
			<div class="relative h-5 mt-2">
				{#each tickIndices as i}
					{@const pt = points[i]}
					{@const xPct = pt.x / VIEWBOX_W}
					<div
						class="absolute top-0 -translate-x-1/2 text-[11px] leading-none text-muted-foreground tabular-nums whitespace-nowrap"
						style="left: {xPct * 100}%;"
					>
						{labels![i]}
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
