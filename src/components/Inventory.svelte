<script>
	import InventoryProducts from './InventoryProducts.svelte';

	export let products;
</script>

<div>
	{#each products as product}
		<InventoryProducts {product} />
	{/each}
</div>
