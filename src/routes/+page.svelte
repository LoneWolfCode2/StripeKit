<script lang="ts">
	import ProductCard from '../components/ProductCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let {productArray} = data;
	console.log(productArray);
	
</script>

<main>
	<div class="min-h-screen bg-gradient-to-br from-[#56ab2f] to-[#a8e063] p-8">
		<div class="text-6xl text-center pb-16 font-bold text-white">Products</div>
		<div class="max-w-screen-xl mx-auto ">
			<div class="grid grid-cols-3 gap-8">
				{#each productArray as product}
					{#if product.active}
						<ProductCard {product} />
					{/if}
				{/each}
			</div>
		</div>
	</div>
</main>
