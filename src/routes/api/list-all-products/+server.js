// @ts-nocheck
/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);

export async function GET({ request }) {
	const products = await stripe.products.list({
		expand: ['data.default_price']
	});

	return new Response(JSON.stringify({ data: products.data }), { status: 200 });
}
