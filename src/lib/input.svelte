<script lang="ts">
	import type {HTMLInputAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import {inputRecipe, type InputVariants} from './input.recipe';
	import type {Assign} from './types';

	let {
		size,
		class: className,
		...props
	} = $props<Assign<HTMLInputAttributes, InputVariants>>();
</script>

<input class={twMerge(inputRecipe({size}), className)} {...props} />
