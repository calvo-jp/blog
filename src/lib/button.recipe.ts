import {tv, type VariantProps} from 'tailwind-variants';

export const buttonRecipe = tv(
	{
		base: 'rounded transition-colors duration-200 disabled:opacity-45',
		variants: {
			size: {
				sm: 'h-8 min-w-8 px-2.5 py-1.5 text-sm leading-none',
				md: 'h-10 min-w-10 px-3 py-2 text-base leading-none',
				lg: 'h-12 min-w-12 px-4 py-3 text-lg leading-none',
			},
			variant: {
				solid:
					'bg-emerald-500 text-white hover:bg-emerald-600/90 dark:bg-emerald-800/50 dark:hover:bg-emerald-700/80',
				outline: [
					'border border-gray-200 text-emerald-500',
					'hover:bg-gray-50 dark:border-neutral-700 dark:hover:bg-neutral-800/25',
					'data-selected:border-emerald-500 data-selected:bg-emerald-500 data-selected:text-white dark:data-selected:border-emerald-800/50 dark:data-selected:bg-emerald-800/50 dark:data-selected:hover:border-emerald-700/80 dark:data-selected:hover:bg-emerald-700/80',
				],
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'solid',
		},
	},
	{
		responsiveVariants: true,
	},
);

export type ButtonVariants = VariantProps<typeof buttonRecipe>;
