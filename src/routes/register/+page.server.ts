import {prisma} from '$lib/server/prisma';
import {redirect} from '@sveltejs/kit';
import bcrypt from 'bcrypt';
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
			return {
				error: parsed.issues[0].message,
			};
		}

		const {name, email, password} = parsed.output;

		if (await prisma.user.exists({email})) {
			return {
				error: 'Email already in use',
			};
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: await bcrypt.hash(password, await bcrypt.genSalt(8)),
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
