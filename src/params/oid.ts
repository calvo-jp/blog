import type {ParamMatcher} from '@sveltejs/kit';

export const match: ParamMatcher = (value) => {
	return /^[a-fA-F0-9]{24}$/.test(value);
};
