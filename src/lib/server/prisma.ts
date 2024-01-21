/* eslint-disable @typescript-eslint/no-explicit-any */

import {markdownToHtml} from '$lib/markdown-to-html';
import {Prisma, PrismaClient} from '@prisma/client';

export const prisma = new PrismaClient()
	.$extends({
		model: {
			$allModels: {
				async exists<T>(
					this: T,
					where: Prisma.Args<T, 'findFirst'>['where'],
				): Promise<boolean> {
					const context = Prisma.getExtensionContext(this);
					const result = await (context as any).findFirst({where});

					return result !== null;
				},
			},
		},
	})
	.$extends({
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
		},
	});
