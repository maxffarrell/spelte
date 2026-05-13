import { getDocSchema } from '$lib/doc';

export function load() {
	const docSchema = getDocSchema();
	return { docSchema };
}
