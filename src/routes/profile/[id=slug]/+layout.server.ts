import {prisma} from '$lib/server/prisma';
import {error} from '@sveltejs/kit';
import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = async (event) => {
	const {id} = event.params;

	const profile = await prisma.user.findUnique({
		where: {id},
		select: {
			id: true,
			name: true,
			email: true,
			followers: true,
		},
	});

	if (!profile) return error(404);

	return {profile};
};
