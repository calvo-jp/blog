import {tv, type VariantProps} from 'tailwind-variants';

export const inputRecipe = tv(
	{
		base: 'block w-full outline-none',
		variants: {
			variant: {
				outline:
					'rounded border border-gray-200 transition-colors duration-200 placeholder:text-gray-400 focus:border focus:border-emerald-300',
			},
			size: {
				md: 'h-10 px-3 py-2',
				lg: 'h-12 px-4 py-3 text-lg',
			},
		},
		defaultVariants: {
			size: 'md',
			variant: 'outline',
		},
	},
	{
		responsiveVariants: true,
	},
);

export type InputVariants = VariantProps<typeof inputRecipe>;
