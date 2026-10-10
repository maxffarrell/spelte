import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';

export default ts.config(
	{ ignores: ['.svelte-kit/**', '.wrangler/**', 'build/**', 'dist/**', 'static/r/**'] },
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// Existing component APIs use permissive types and positional animation lists.
			'@typescript-eslint/no-explicit-any': 'off',
			'svelte/require-each-key': 'off',
			// The site uses the root base path, and registry components accept external URLs.
			'svelte/no-navigation-without-resolve': 'off',
			// Explicit spaces in animated text must survive Svelte whitespace trimming.
			'svelte/no-useless-mustaches': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: { parserOptions: { parser: ts.parser } }
	},
	{
		files: ['src/lib/components/code-block.svelte'],
		// HTML comes from Shiki or the local escapeHtml function.
		rules: { 'svelte/no-at-html-tags': 'off' }
	},
	{
		files: ['src/registry/spelte/kbd.svelte'],
		// The Set only deduplicates a local list; it is not reactive state.
		rules: { 'svelte/prefer-svelte-reactivity': 'off' }
	}
);
