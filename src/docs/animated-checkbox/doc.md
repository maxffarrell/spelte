## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Implement Checkbox"` | The label shown next to the animated check indicator. |
| `checked` | `boolean` | `false` | Controlled checked state. Provide this together with `onCheckedChange` for fully managed behavior. |
| `defaultChecked` | `boolean` | `false` | Initial checked state for uncontrolled usage. |
| `onCheckedChange` | `((checked: boolean) => void) \| undefined` | `undefined` | Callback fired whenever the checkbox toggles. |
| `class` | `string` | `undefined` | Custom classes merged onto the clickable button root. |
