import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
import * as v from 'valibot';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) redirect(303, '/');
};

export const actions: Actions = {
	async default(event) {
		const form = await event.request.formData();
		const parsed = v.safeParse(schema, {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const {name, email, password} = parsed.output;

		if (await prisma.user.exists({email})) {
			return fail(400, {
				success: false,
				message: 'Email already in use',
			});
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password,
			},
			select: {
				id: true,
			},
		});

		event.cookies.set('user', user.id, {path: '/'});
		redirect(303, '/');
	},
};

const schema = v.object({
	name: v.string([v.toTrimmed(), v.minLength(2), v.maxLength(25)]),
	email: v.string([v.email()]),
	password: v.string([v.minLength(8)]),
});
