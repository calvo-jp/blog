import {markdownToHtml} from '$lib/markdown-to-html';
import {prisma} from '$lib/server/prisma';
import {error} from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

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

	post.content = markdownToHtml(post.content);

	return {post};
};
