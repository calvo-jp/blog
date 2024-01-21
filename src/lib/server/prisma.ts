/* eslint-disable @typescript-eslint/no-explicit-any */

import {markdownToHtml} from '$lib/markdown-to-html';
import {Prisma, PrismaClient} from '@prisma/client';
import bcrypt from 'bcrypt';

export const prisma = new PrismaClient().$extends({
	model: {
		$allModels: {
			async exists<T>(this: T, where: Prisma.Args<T, 'findFirst'>['where']) {
				const context = Prisma.getExtensionContext(this) as any;
				const result = await context.findFirst({where});
				return result !== null;
			},
		},
	},

	query: {
		post: {
			async findUnique({args, query}) {
				const post = await query(args);

				if (post?.content) {
					post.content = markdownToHtml(post.content);
				}

				return post;
			},
		},

		user: {
			async $allOperations({args, query, operation}) {
				if (operation === 'create' || operation === 'update') {
					if (args.data.password) {
						args.data.password = await bcrypt.hash(
							args.data.password.toString(),
							await bcrypt.genSalt(8),
						);
					}
				}

				return query(args);
			},
		},
	},
});
