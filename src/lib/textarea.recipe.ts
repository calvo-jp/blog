import {tv, type VariantProps} from 'tailwind-variants';
import {inputRecipe} from './input.recipe';

export const textareaRecipe = tv({
	extend: inputRecipe,
	variants: {
		size: {
			md: 'h-auto',
			lg: 'h-auto',
		},
	},
});

export type TextareaVariants = VariantProps<typeof textareaRecipe>;
