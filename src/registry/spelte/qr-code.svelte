<script lang="ts">
	import { cn } from '$lib/utils';
	import QRCodeLib from 'qrcode';

	interface Props {
		value: string;
		size?: number;
		fgColor?: string;
		bgColor?: string;
		errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
		class?: string;
	}

	let {
		value,
		size = 268,
		fgColor = 'var(--foreground)',
		bgColor = 'var(--background)',
		errorCorrectionLevel = 'M',
		class: className
	}: Props = $props();

	function isInFinderPattern(row: number, col: number, sz: number): boolean {
		return (row < 7 && col < 7) || (row < 7 && col >= sz - 7) || (row >= sz - 7 && col < 7);
	}

	const qrData = $derived.by(() => {
		try {
			return QRCodeLib.create(value, { errorCorrectionLevel });
		} catch {
			return null;
		}
	});

	const qrInfo = $derived.by(() => {
		if (!qrData) return null;
		const moduleCount = qrData.modules.size;
		const moduleSize = size / moduleCount;
		const circleRadius = moduleSize * (1 / 3);
		const finderSize = 7 * moduleSize;
		const innerPadding = moduleSize;
		const innerWhiteSize = 5 * moduleSize;
		const innerBlackSize = 3 * moduleSize;

		const finderPositions: [number, number][] = [
			[0, 0], [0, moduleCount - 7], [moduleCount - 7, 0]
		];

		const circles: { cx: number; cy: number }[] = [];
		for (let row = 0; row < moduleCount; row++) {
			for (let col = 0; col < moduleCount; col++) {
				if (qrData.modules.get(row, col) && !isInFinderPattern(row, col, moduleCount)) {
					circles.push({ cx: (col + 0.5) * moduleSize, cy: (row + 0.5) * moduleSize });
				}
			}
		}

		return { moduleCount, moduleSize, circleRadius, finderSize, innerPadding, innerWhiteSize, innerBlackSize, finderPositions, circles };
	});
</script>

{#if qrData && qrInfo}
	<svg
		width={size}
		height={size}
		viewBox="0 0 {size} {size}"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="QR code for {value}"
		class={cn('block', className)}
	>
		<rect width={size} height={size} fill={bgColor} rx="12" ry="12" />
		{#each qrInfo.finderPositions as [r, c]}
			{@const x = c * qrInfo.moduleSize}
			{@const y = r * qrInfo.moduleSize}
			<g>
				<rect {x} {y} width={qrInfo.finderSize} height={qrInfo.finderSize} fill={fgColor} rx="12" ry="12" />
				<rect x={x + qrInfo.innerPadding} y={y + qrInfo.innerPadding} width={qrInfo.innerWhiteSize} height={qrInfo.innerWhiteSize} fill={bgColor} rx="8" ry="8" />
				<rect x={x + qrInfo.innerPadding * 2} y={y + qrInfo.innerPadding * 2} width={qrInfo.innerBlackSize} height={qrInfo.innerBlackSize} fill={fgColor} rx="3" ry="3" />
			</g>
		{/each}
		{#each qrInfo.circles as { cx, cy }, i}
			<circle {cx} {cy} r={qrInfo.circleRadius} fill={fgColor} />
		{/each}
	</svg>
{/if}
