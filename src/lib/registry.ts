import registryData from '../../registry.json';
import type { Registry, RegistryItem } from '$lib/types';

export function getRegistry(): Registry {
	return registryData as Registry;
}

export function getRegistryItem(name: string): RegistryItem | null {
	return registryData.items.find((item) => item.name === name) ?? null;
}
