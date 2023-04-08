/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
// @ts-ignore
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

export async function POST({ request }) {
	const { productID: id } = await request.json();
	let currentItemData = await stripe.products.retrieve(id);
	let { sold: cuSold, total: cuTotal, in_a_basket: cuInABasket } = currentItemData.metadata;
	const updateProduct = await stripe.products.update(id, {
		metadata: {
			in_a_basket: parseInt(cuInABasket) + 1,
			available: parseInt(cuTotal) - (parseInt(cuSold) + parseInt(cuInABasket) + 1)
		}
	});
	return new Response('ok', { status: 200 });
}
