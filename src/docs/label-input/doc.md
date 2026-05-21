<script>
	import ExampleShell from '$lib/components/example-shell.svelte';
	import LabelInputPasswordInputExample from '$lib/components/examples/label-input/password-input.svelte';
	import LabelInputRingColorExample from '$lib/components/examples/label-input/ring-color.svelte';
</script>

## Examples

<ExampleShell title="Password Input" name="label-input/password-input">
	{#snippet preview()}
		<LabelInputPasswordInputExample />
	{/snippet}
</ExampleShell>

<ExampleShell title="Ring Color" name="label-input/ring-color">
	{#snippet preview()}
		<LabelInputRingColorExample />
	{/snippet}
</ExampleShell>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"text" \| "email" \| "password" \| "search" \| "tel" \| "url" \| "number" \| "hidden"` | `"text"` | Controls the input type and enables the password visibility toggle when set to `password`. |
| `label` | `string` | `""` | The floating label text rendered inside the field container. |
| `ringColor` | `RingColor \| undefined` | `"muted"` | Selects the focus ring color variant for the input. |
| `value` | `string \| number \| undefined` | `undefined` | Controlled field value. Supports `bind:value`. |
| `placeholder` | `string \| undefined` | `""` | Hidden by default and revealed during focus to avoid competing with the label. |
| `containerClassName` | `string \| undefined` | `undefined` | Custom classes applied to the outer wrapper element. |
| `inputClassName` | `string \| undefined` | `undefined` | Custom classes applied directly to the input element. |
| `disabled` | `boolean \| undefined` | `false` | Disables typing, focus styles, and the password toggle button. |
| `class` | `string \| undefined` | `undefined` | Custom classes merged onto the wrapper root. |
