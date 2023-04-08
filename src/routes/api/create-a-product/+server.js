/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
import { PRIVATE_STRIPE_SECRET_KEY } from '$env/static/private';
// @ts-ignore
const stripe = new Stripe(PRIVATE_STRIPE_SECRET_KEY);
export async function POST({ request }) {
	const body = await request.json();
	const product = await stripe.products.create({
		name: body?.productName,
		active: body?.active,
		description: body?.description,
		metadata: {
			onHand: body?.onHand,
			available: body?.available,
			committed: body?.committed
		},
		default_price_data: {
			currency: body?.currency,
			unit_amount_decimal: body?.price,
			tax_behavior: body?.taxBehavior
		},
		images: body?.productImageUrlArray,
		package_dimensions: {
			height: body?.height,
			width: body?.width,
			length: body?.length,
			weight: body?.weight
		},
		shippable: body?.shippable,
		statement_descriptor: body.statementDescriptor
	});

	return new Response(null, { status: 200 });
}
