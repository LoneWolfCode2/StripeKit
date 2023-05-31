<script>
	// @ts-nocheck

	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	let orderSelected;
	let orders = [];
	onMount(async () => {
		let res = await supabaseClient.from('orders').select('*');
		orders = res?.data;
		console.log(orders);
		orders.forEach((item) => {
			item.metadata = JSON.parse(item.metadata);
			item.shipping = JSON.parse(item.shipping);
		});
	});
</script>

<h1 class="text-center text-white font-bold">ORDERS</h1>
<table class="min-w-full text-left text-sm font-light">
	<thead class="border-b font-medium dark:border-neutral-500">
		<tr>
			<th scope="col" class="px-6 py-4">Order #</th>
			<th scope="col" class="px-6 py-4">Created</th>
			<th scope="col" class="px-6 py-4">Order Breakdown</th>
			<th scope="col" class="px-6 py-4">Status</th>
			<th scope="col" class="px-6 py-4">Shipping address</th>
		</tr>
	</thead>
	<tbody>
		{#each orders as order}
			<tr
				class="border-b dark:border-neutral-500 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] hover:rounded-xl"
				on:click={() => null}
			>
				<td class="whitespace-nowrap px-6 py-4 font-medium">{order.id}</td>
				<td class="whitespace-nowrap px-6 py-4"
					>{new Intl.DateTimeFormat(['en-us'], {
						dateStyle: 'full',
						timeStyle: 'short',
						timeZone: order.created_at.timezone
					}).format(new Date(order.created_at))}</td
				>
				<td class="whitespace-nowrap px-6 py-4"
					>{#each order.metadata as item}
						<div class="flex justify-between">
							<div>
								{item.name}
							</div>
							<div>
								{item.qty}
							</div>
						</div>
					{/each}</td
				>
				<td class="whitespace-nowrap px-6 py-4"> PAID </td>
				{#if order.shipping}
					<td class="flex flex-col">
						<div>{order.shipping?.name}</div>

						<div>{order.shipping?.address.line1}, {order.shipping?.address.line2},</div>
						<div>
							{order.shipping?.address.city},{order.shipping?.address.state}
							{order.shipping?.address.postal_code}
						</div>
						<div>{order.shipping?.address.country}</div>
					</td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
