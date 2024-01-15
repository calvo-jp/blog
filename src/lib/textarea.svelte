<script lang="ts">
	import type {HTMLTextareaAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import {textareaRecipe, type TextareaVariants} from './textarea.recipe';
	import type {Assign} from './types';

	let {
		size,
		class: className,
		...props
	} = $props<Assign<HTMLTextareaAttributes, TextareaVariants>>();
</script>

<textarea class={twMerge(textareaRecipe({size}), className)} {...props} />
