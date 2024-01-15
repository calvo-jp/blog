import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = (event) => {
	const params = event.params;

	return {params};
};
