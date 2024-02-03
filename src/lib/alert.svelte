<script lang="ts">
	import type {HTMLAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import {alertRecipe, type AlertVariants} from './alert.recipe';
	import CheckCircleIcon from './check-circle-icon.svelte';
	import ExclamationCircleIcon from './exclamation-circle-icon.svelte';
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
		<CheckCircleIcon class={recipe.icon()} />
	{:else}
		<ExclamationCircleIcon class={recipe.icon()} />
	{/if}

	{#if children}
		{@render children()}
	{/if}
</div>
