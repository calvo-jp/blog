import {prisma} from '$lib/server/prisma';
import type {Handle} from '@sveltejs/kit';

export const handle: Handle = async ({event, resolve}) => {
	const id = event.cookies.get('user');

	event.locals.user = !id
		? null
		: await prisma.user.findUnique({
				where: {id},
				select: {
					id: true,
					bio: true,
					name: true,
					email: true,
					image: true,
					createdAt: true,
					followers: true,
				},
			});

	return await resolve(event);
};
