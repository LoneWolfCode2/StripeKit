/**@type {import('./$types').PageLoad} */
export async function load({fetch, params}){
    const res = await fetch(`api/list-all-products`);
    const products = await res.json();
    return {products}
}