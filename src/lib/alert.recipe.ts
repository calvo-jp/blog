import {tv, type VariantProps} from 'tailwind-variants';

export const alertRecipe = tv(
	{
		slots: {
			root: 'flex items-center gap-2 rounded p-4 leading-none',
			icon: 'h-5 w-5',
		},
		variants: {
			status: {
				error: {
					root: [
						'bg-red-50 text-red-600',
						'dark:bg-red-800/20 dark:text-red-300',
					],
				},
				success: {
					root: [
						'bg-green-50 text-green-600',
						'dark:bg-green-800/20 dark:text-green-300',
					],
				},
			},
		},
		defaultVariants: {
			status: 'success',
		},
	},
	{
		responsiveVariants: true,
	},
);

export type AlertVariants = VariantProps<typeof alertRecipe>;
