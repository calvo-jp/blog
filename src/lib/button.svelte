<script lang="ts">
	import type {HTMLButtonAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import {buttonRecipe, type ButtonVariants} from './button.recipe';
	import type {Assign} from './types';

	let {
		size,
		variant,
		class: className,
		children,
		...props
	} = $props<Assign<HTMLButtonAttributes, ButtonVariants>>();
</script>

<button
	type="button"
	class={twMerge(buttonRecipe({size, variant}), className)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</button>
