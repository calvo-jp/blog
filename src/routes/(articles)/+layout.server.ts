import {prisma} from '$lib/server/prisma';
import type {LayoutServerLoad} from '../$types';

export const load: LayoutServerLoad = async () => {
	const tags = (await prisma.post.aggregateRaw({
		pipeline: [
			{
				$group: {
					_id: {
						$setUnion: '$tags',
					},
					count: {
						$sum: 1,
					},
				},
			},
			{
				$unwind: '$_id',
			},
			{
				$group: {
					_id: '$_id',
					count: {
						$sum: '$count',
					},
				},
			},
			{
				$sort: {
					count: -1,
				},
			},
			{
				$limit: 10,
			},
			{
				$project: {
					_id: 0,
					tag: '$_id',
					count: 1,
				},
			},
		],
	})) as unknown as {tag: string; count: number}[];

	return {tags};
};
