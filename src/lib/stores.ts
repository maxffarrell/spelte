import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

type Config = {
	packageManager: PackageManager;
};

const defaultConfig: Config = { packageManager: 'pnpm' };

function createPersistedConfig() {
	const stored = browser ? localStorage.getItem('spelte-config') : null;
	const initial: Config = stored ? JSON.parse(stored) : defaultConfig;
	const { subscribe, set, update } = writable<Config>(initial);

	return {
		subscribe,
		set(value: Config) {
			if (browser) localStorage.setItem('spelte-config', JSON.stringify(value));
			set(value);
		},
		update(fn: (c: Config) => Config) {
			update((c) => {
				const next = fn(c);
				if (browser) localStorage.setItem('spelte-config', JSON.stringify(next));
				return next;
			});
		},
	};
}

export const config = createPersistedConfig();
