import type {User} from '@prisma/client';

/* prettier-ignore */
type CurrentUser = Pick<
	User,
	| 'id'
	| 'bio'
	| 'name'
	| 'email'
	| 'image'
	| 'createdAt'
	| 'followers'
>;

declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			user: CurrentUser | null;
		}

		interface PageData {
			user: CurrentUser | null;
			[key: string]: unknown;
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
