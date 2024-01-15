import {redirect} from '@sveltejs/kit';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');
};

export const actions: Actions = {
	logout(event) {
		event.cookies.delete('user', {path: '/'});
		redirect(303, '/');
	},
};
