/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
// @ts-ignore
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

export async function POST({ request }) {
	let { direction, value, id } = await request.json();
	let currentItemData = await stripe.products.retrieve(id);
	let {
		sold: cuSold,
		total: cuTotal,
		in_a_basket: cuInABasket,
		available: cuAvailable
	} = currentItemData.metadata;
	if (direction === 'increase') {
		const updateProduct = await stripe.products.update(id, {
			metadata: {
				total: parseInt(cuTotal) + parseInt(value),
				available: parseInt(cuAvailable) + parseInt(value)
			}
		});
	} else if (direction === 'decrease') {
		const updateProduct = await stripe.products.update(id, {
			metadata: {
				total: parseInt(cuTotal) - parseInt(value),
				available: parseInt(cuAvailable) - parseInt(value)
			}
		});
	}

	return new Response('ok', { status: 200 });
}
