import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import * as v from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');
};

export const actions: Actions = {
	async updateProfile(event) {
		const {user} = event.locals;

		if (!user) {
			return fail(401, {
				success: false,
				message: 'Not authorized',
			});
		}

		const form = await event.request.formData();
		const parsed = v.safeParse(schema, {
			bio: coalesce(form.get('bio')),
			name: coalesce(form.get('name')),
			email: coalesce(form.get('email')),
			image: coalesce(form.get('image')),
			password: coalesce(form.get('password')),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const {id} = user;
		const {bio, name, email, image, password} = parsed.output;

		if (email !== user.email && (await prisma.user.exists({email}))) {
			return fail(400, {
				success: false,
				message: 'Email already in use',
			});
		}

		await prisma.user.update({
			where: {id},
			data: {
				bio,
				name,
				email,
				image,
				password,
			},
		});

		return {
			success: true,
			message: 'Changes have been saved',
		};
	},
	logout(event) {
		event.cookies.delete('user', {path: '/'});
		redirect(303, '/');
	},
};

function coalesce(value: unknown) {
	return value || undefined;
}

const schema = v.object({
	bio: v.optional(v.string([v.toTrimmed(), v.minLength(5), v.maxLength(150)])),
	name: v.optional(v.string([v.toTrimmed(), v.minLength(2), v.maxLength(25)])),
	email: v.optional(v.string([v.email()])),
	image: v.optional(v.string([v.url()])),
	password: v.optional(v.string([v.minLength(8)])),
});
