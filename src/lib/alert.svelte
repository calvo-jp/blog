<script lang="ts">
	import {CheckCircleIcon, XCircleIcon} from '@untitled-theme/icons-svelte';
	import type {HTMLAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import {alertRecipe, type AlertVariants} from './alert.recipe';
	import type {Assign} from './types';

	interface AlertProps
		extends Assign<HTMLAttributes<HTMLDivElement>, AlertVariants> {}

	let {
		status = 'success',
		children,
		class: className,
		...props
	} = $props<AlertProps>();

	const recipe = $derived(alertRecipe({status}));
</script>

<div role="alert" class={twMerge(recipe.root(), className)} {...props}>
	{#if status === 'error'}
		<XCircleIcon class={recipe.icon()} />
	{:else}
		<CheckCircleIcon class={recipe.icon()} />
	{/if}

	{#if children}
		{@render children()}
	{/if}
</div>
