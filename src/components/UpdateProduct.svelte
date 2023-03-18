<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import ProductCard from './ProductCard.svelte';
	import ProductUpdateCard from './ProductUpdateCard.svelte';

	export let products;
	let productSelected;
</script>

<div in:fade={{ delay: 400 }} out:fade class="py-8">
	<h1 class="pb-8 text-xl font-bold text-white">Select a product</h1>
	<div class="bg-gradient-tr from-emerald-200 to-blue-500">
		{#if productSelected}
			<ProductUpdateCard {productSelected} />
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto">
				{#each products as product}
					<div
						on:click={() => {
							productSelected = product;
						}}
						on:keydown
						class="cursor-pointer"
					>
						<ProductCard {product} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
