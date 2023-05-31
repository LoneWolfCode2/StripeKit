<script>
	import InventoryProducts from './InventoryProducts.svelte';

	export let products;
</script>

<div>
	{#each products.filter((product) => product.active) as product}
		<InventoryProducts {product} />
	{/each}
</div>
