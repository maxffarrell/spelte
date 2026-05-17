Spell UI exposes its registry through MCP-compatible metadata so AI coding tools can discover components, read installation details, and copy implementation-ready examples.

## Usage

Connect your tool to the Spell UI registry endpoint and ask for a component by name.

```json
{
  "registry": "https://spelte.dev/r",
  "components": ["badge", "pop-button", "signature"]
}
```

## Registry

Each component is available as a JSON registry item:

```txt
https://spelte.dev/r/badge.json
```
