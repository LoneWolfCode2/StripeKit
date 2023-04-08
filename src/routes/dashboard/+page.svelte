<script lang="ts">
	import CreateAProduct from '../../components/CreateAProduct.svelte';
	import UpdateProduct from '../../components/UpdateProduct.svelte';
	import Orders from '../../components/Orders.svelte';
	import Inventory from '../../components/Inventory.svelte';
	//icons
	import FaPlusSquare from 'svelte-icons/fa/FaPlusSquare.svelte';
	import GoListOrdered from 'svelte-icons/go/GoListOrdered.svelte';
	import FaSyncAlt from 'svelte-icons/fa/FaSyncAlt.svelte';
	import FaClipboard from 'svelte-icons/fa/FaClipboard.svelte';
	//icons
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { goto, invalidate } from '$app/navigation';

	export let data: PageData;
	let action = '';
	if (!data.session) {
		redirect(303, '/');
	}

	let products = data.products.data;
</script>

<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen p-2">
	<form action="/logout" method="POST" class="float-right mr-16 text-white text-3xl">
		<button type="submit">Logout</button>
	</form>

	<div class="max-w-screen-xl mx-auto ">
		<div class="p-4">
			<h1 class="text-center font-extrabold text-white">Dashboard</h1>
		</div>
		<div class="flex flex-col gap-32 mt-8 items-center absolute md:left-40">
			<button
				class=""
				on:click={() => (action === 'create-product' ? (action = '') : (action = 'create-product'))}
			>
				<div class="h-8 text-white">
					<FaPlusSquare />
					Add a Product
				</div>
			</button>
			<button
				class=""
				on:click={() => (action === 'update-product' ? (action = '') : (action = 'update-product'))}
			>
				<div class="h-8 text-white">
					<FaSyncAlt />
					Update a Product
				</div>
			</button>
			<button on:click={() => (action === 'orders' ? (action = '') : (action = 'orders'))}>
				<div class="h-8 text-white">
					<GoListOrdered />
					Orders
				</div>
			</button>
			<button
				on:click={() => {
					action === 'inventory' ? (action = '') : (action = 'inventory');
				}}
			>
				<div class="h-8 text-white">
					<FaClipboard />
					Inventory
				</div>
			</button>
		</div>
		<div class="ml-32 md:ml-40 max-w-screen-lg -top-36">
			{#if data.session && action === 'create-product'}
				<CreateAProduct />
			{/if}
			{#if data.session && action === 'update-product'}
				<UpdateProduct {products} />
			{/if}
			{#if data.session && action === 'orders'}
				<Orders />
			{/if}
			{#if data.session && action === 'inventory'}
				<Inventory {products} />
			{/if}
		</div>
	</div>
</div>
