import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import slugify from 'slugify';
import * as v from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');
};

export const actions: Actions = {
	async default(event) {
		const {user} = event.locals;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		const form = await event.request.formData();
		const parsed = v.safeParse(schema, {
			title: form.get('title'),
			description: form.get('description'),
			content: form.get('content'),
			tags: form.get('tags'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const {title, description, content, tags} = parsed.output;

		const slug = slugify(title);
		const authorId = user.id;

		await prisma.post.create({
			data: {
				slug,
				title,
				description,
				content,
				tags,
				authorId,
			},
		});

		return {
			success: true,
			message: 'Article has been created',
		};
	},
};

const schema = v.object({
	title: v.string([
		v.toTrimmed(),
		v.minLength(4, 'Title too short'),
		v.maxLength(150, 'Title too long'),
	]),
	description: v.string([
		v.toTrimmed(),
		v.minLength(4, 'Description too short'),
		v.maxLength(500, 'Description too long'),
	]),
	content: v.string([v.minLength(1, 'Content too short')]),
	tags: v.transform(
		v.string([
			v.toTrimmed(),
			v.minLength(3, 'Tag too short'),
			v.maxLength(25, 'Tag too long'),
		]),
		(value) => {
			return value.split(',');
		},
	),
});
