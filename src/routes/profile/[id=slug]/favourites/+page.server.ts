import {prisma} from '$lib/server/prisma';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const {profile} = await event.parent();
	const posts = await prisma.post.findMany({
		where: {
			favourites: {
				some: {
					id: profile.id,
				},
			},
		},
		select: {
			id: true,
			slug: true,
			title: true,
			description: true,
			content: true,
			tags: true,
			createdAt: true,
			author: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
			_count: {
				select: {
					comments: true,
					favourites: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {posts};
};
