<script lang="ts">
	import PropsTable from '$lib/components/props-table.svelte';

	const props = [
		{
			name: 'config',
			type: '{ preset: PresetName } | { preset: "custom"; color1: string; color2: string; color3: string; ... }',
			default: '{ preset: "Prism" }',
			nameDetails: 'Gradient configuration - use a preset or custom settings'
		},
		{
			name: 'noise',
			type: '{ opacity: number; scale?: number }',
			nameDetails: 'Optional noise overlay configuration'
		},
		{
			name: 'radius',
			type: 'string',
			default: '"0px"',
			nameDetails: 'Border radius of the container'
		},
		{
			name: 'style',
			type: 'string',
			nameDetails: 'Additional inline styles'
		},
		{
			name: 'class',
			type: 'string',
			nameDetails: 'Additional CSS classes'
		}
	];

	const customConfigProps = [
		{ name: 'color1', type: 'string', default: 'required', nameDetails: 'First gradient color' },
		{ name: 'color2', type: 'string', default: 'required', nameDetails: 'Second gradient color' },
		{ name: 'color3', type: 'string', default: 'required', nameDetails: 'Third gradient color' },
		{ name: 'rotation', type: 'number', default: '0', nameDetails: 'Rotation angle (-360 to 360)' },
		{ name: 'proportion', type: 'number', default: '35', nameDetails: 'Color proportion (0-100)' },
		{ name: 'scale', type: 'number', default: '1', nameDetails: 'Scale of the pattern' },
		{ name: 'speed', type: 'number', default: '25', nameDetails: 'Animation speed (0-100)' },
		{ name: 'distortion', type: 'number', default: '12', nameDetails: 'Noise distortion (0-100)' },
		{ name: 'swirl', type: 'number', default: '80', nameDetails: 'Swirl intensity (0-100)' },
		{
			name: 'swirlIterations',
			type: 'number',
			default: '10',
			nameDetails: 'Number of swirl layers (0-20)'
		},
		{ name: 'softness', type: 'number', default: '100', nameDetails: 'Edge softness (0-100)' },
		{ name: 'offset', type: 'number', default: '0', nameDetails: 'Time offset (-1000 to 1000)' },
		{
			name: 'shape',
			type: '"Checks" | "Stripes" | "Edge"',
			default: '"Checks"',
			nameDetails: 'Base pattern shape'
		},
		{ name: 'shapeSize', type: 'number', default: '10', nameDetails: 'Size of the pattern (0-100)' }
	];
</script>

<section class="not-prose mt-8">
	<h2 id="props" class="mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
		Props
	</h2>
	<PropsTable data={props} />

	<h3
		id="custom-config-options"
		class="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
	>
		Custom Config Options
	</h3>
	<p class="mt-3 text-sm text-muted-foreground">
		When using <code class="rounded-md bg-muted/75 px-1.5 py-0.5 font-mono text-neutral-600 dark:bg-muted/50 dark:text-neutral-300">preset: "custom"</code>, these options are available:
	</p>
	<PropsTable data={customConfigProps} />
</section>
