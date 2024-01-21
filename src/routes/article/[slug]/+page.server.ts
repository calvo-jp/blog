import {prisma} from '$lib/server/prisma';
import {error, fail} from '@sveltejs/kit';
import * as v from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	const post = await prisma.post.findUnique({
		where: {
			slug: event.params.slug,
		},
		select: {
			id: true,
			title: true,
			description: true,
			content: true,
			tags: true,
			author: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
			createdAt: true,
		},
	});

	if (!post) error(404, {message: 'Post not found'});

	const comments = prisma.comment.findMany({
		where: {
			postId: post.id,
		},
		select: {
			id: true,
			content: true,
			user: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
			createdAt: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return {post, comments};
};

export const actions: Actions = {
	async addComment(event) {
		const {user} = event.locals;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		const form = await event.request.formData();
		const parsed = v.safeParse(addCommentSchema, {
			postId: form.get('postId'),
			content: form.get('content'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const userId = user.id;
		const {content, postId} = parsed.output;

		await prisma.comment.create({
			data: {
				postId,
				userId,
				content,
			},
		});

		return {
			success: true,
			message: 'Comment created',
		};
	},
	async removeComment(event) {
		const {user} = event.locals;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		const form = await event.request.formData();
		const id = form.get('id')?.toString();

		if (!id) {
			return fail(400, {
				success: false,
				message: "Missing 'id'",
			});
		}

		const exists = await prisma.comment.exists({id});

		if (exists) await prisma.comment.delete({where: {id}});

		return {
			success: true,
			message: 'Comment removed',
		};
	},
};

const addCommentSchema = v.object({
	postId: v.string(),
	content: v.string([v.toTrimmed(), v.minLength(2)]),
});
