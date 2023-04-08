// @ts-nocheck
import { basket } from '../../stores';
let basket_array;

basket.subscribe((value) => {
	basket_array = value;
});

/**@type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`/api/create-payment-intent`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ basket_array })
	});
	const response = await res.json();

	let { client_secret, id } = response.data;
	return { clientSecret: client_secret, id: id };
}
