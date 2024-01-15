// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}

		interface Locals {
			user: null | {
				id: string;
				bio: string | null;
				name: string;
				email: string;
				image: string | null;
			};
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
