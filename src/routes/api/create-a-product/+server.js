/** @type {import('./$types').RequestHandler} */
import Stripe from 'stripe';
// @ts-ignore
const stripe = new Stripe(
	'sk_test_51JnRvABq6A81Gm86E8pVhcJKrCa8ttRIav6immgWAJwp1Cvj0UegXSnh3g6UrKu4nmrNZewSJuLaww1FE26qUtd000TMp6Ijld'
);
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
