import {prisma} from '$lib/server/prisma';
import {fail, redirect} from '@sveltejs/kit';
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
			email: form.get('email'),
			password: form.get('password'),
		});

		if (!parsed.success) {
			return fail(400, {
				success: false,
				message: parsed.issues[0].message,
			});
		}

		const {email, password} = parsed.output;
		const user = await prisma.user.findUnique({
			where: {email},
			select: {
				id: true,
				password: true,
			},
		});

		if (user && (await bcrypt.compare(password, user.password))) {
			event.cookies.set('user', user.id, {path: '/'});
			redirect(303, '/');
		}

		return fail(400, {
			success: false,
			message: 'Invalid username or password',
		});
	},
};

const schema = v.object({
	email: v.string([v.email()]),
	password: v.string([v.minLength(8)]),
});
