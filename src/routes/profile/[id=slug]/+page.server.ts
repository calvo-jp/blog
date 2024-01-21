import {prisma} from '$lib/server/prisma';
import {fail} from '@sveltejs/kit';
import * as v from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const {page, size} = v.parse(querySchema, {
		page: event.url.searchParams.get('page'),
		size: event.url.searchParams.get('size'),
	});

	const {profile} = await event.parent();
	const rows = await prisma.post.findMany({
		where: {
			authorId: profile.id,
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

	return {
		rows,
		page,
		size,
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
	async follow(event) {
		const followerId = event.locals.user?.id;
		const followeeId = event.params.id;

		if (!followerId) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		await prisma.user.update({
			data: {
				followers: {
					push: [followerId],
				},
			},
			where: {
				id: followeeId,
			},
		});

		return {
			success: true,
			message: 'Followed',
		};
	},
	async unfollow(event) {
		const followeeId = event.params.id;
		const followerId = event.locals.user?.id;

		if (!followerId) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		const followee = await prisma.user.findUnique({
			where: {
				id: followeeId,
			},
			select: {
				followers: true,
			},
		});

		if (!followee) {
			return fail(400, {
				success: false,
				message: 'Account not found',
			});
		}

		await prisma.user.update({
			data: {
				followers: {
					set: followee.followers.filter((id) => id !== followerId),
				},
			},
			where: {
				id: followeeId,
			},
		});

		return {
			success: true,
			message: 'Unfollowed',
		};
	},
};
