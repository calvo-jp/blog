import {prisma} from '$lib/server/prisma';
import type {Prisma} from '@prisma/client';
import {error} from '@sveltejs/kit';
import * as v from 'valibot';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const {tag} = event.params;
	const {page, size} = v.parse(querySchema, {
		page: event.url.searchParams.get('page'),
		size: event.url.searchParams.get('size'),
	});

	const where: Prisma.PostWhereInput = {
		tags: {
			has: event.params.tag,
		},
	};

	const count = await prisma.post.count({where});

	if (count <= 0) return error(404, {message: 'Tag does not exist'});

	const rows = await prisma.post.findMany({
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
			favourites: {
				select: {
					userId: true,
				},
			},
		},
		take: size,
		skip: size * (page - 1),
		where,
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {
		tag,
		rows,
		page,
		size,
		count,
	};
};

const defaultPage = 1;
const defaultSize = 5;
const querySchema = v.object({
	page: v.transform(v.nullable(v.string()), (v) => {
		if (!v) return defaultPage;

		const n = parseInt(v);

		return Number.isNaN(n) ? defaultPage : n < 1 ? defaultPage : n;
	}),
	size: v.transform(v.nullable(v.string()), (v) => {
		if (!v) return defaultSize;

		const n = parseInt(v);

		return Number.isNaN(n) ? defaultSize : n < 1 ? defaultSize : n;
	}),
});
