import {prisma} from '$lib/server/prisma';
import {fail} from '@sveltejs/kit';
import * as v from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const {page, size} = v.parse(querySchema, {
		page: event.url.searchParams.get('page'),
		size: event.url.searchParams.get('size'),
	});

	const rows = await prisma.post.findMany({
		select: {
			id: true,
			slug: true,
			title: true,
			description: true,
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
		orderBy: {
			createdAt: 'desc',
		},
		take: size,
		skip: size * (page - 1),
	});

	const count = await prisma.post.count();

	return {
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

export const actions: Actions = {
	async addToFavourites(event) {
		const {user} = event.locals;

		if (!user)
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});

		const form = await event.request.formData();
		const postId = form.get('postId')?.toString();
		const userId = user.id;

		if (!postId) {
			return fail(400, {
				success: false,
				message: "Missing 'postId'",
			});
		}

		const exists = await prisma.favourite.exists({AND: {userId, postId}});

		if (!exists) {
			await prisma.favourite.create({
				data: {
					userId,
					postId,
				},
			});
		}

		return {
			success: true,
			message: 'Added post to favourites',
		};
	},
	async removeFromFavourites(event) {
		const {user} = event.locals;

		if (!user)
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});

		const form = await event.request.formData();
		const postId = form.get('postId')?.toString();
		const userId = user.id;

		if (!postId) {
			return fail(400, {
				success: false,
				message: "Missing 'postId'",
			});
		}

		await prisma.favourite.deleteMany({
			where: {
				AND: {
					userId,
					postId,
				},
			},
		});

		return {
			success: true,
			message: 'Removed post post favourites',
		};
	},
};
