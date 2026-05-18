## Usage

```svelte
<script>
  import LabelInput from '$registry/spelte/label-input.svelte';
</script>

<LabelInput label="Email" type="email" />
<LabelInput label="Password" type="password" />
<LabelInput label="Name" ringColor="blue" />
```

## Examples

### Password Input

~~~svelte
<LabelInput label="Password" type="password" ringColor="blue" class="max-w-72" />
~~~

### Ring Color

~~~svelte
<div class="flex gap-4 max-md:flex-col">
  <LabelInput label="Primary" ringColor="primary" class="max-w-40" />
  <LabelInput label="Orange" ringColor="orange" class="max-w-40" />
  <LabelInput label="Blue" ringColor="blue" class="max-w-40" />
</div>
~~~

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
