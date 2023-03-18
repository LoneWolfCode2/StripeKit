import { basket } from '../../stores';
let basket_array;

basket.subscribe((value) => {
    basket_array = value;

})

/**@type {import('./$types').PageLoad} */
export async function load({fetch, params}){
    const res = await fetch(`/api/create-payment-intent`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({basket_array}),

    })
    const clientSecret = await res.json();
    return clientSecret   
}