<script>
	import Sidebar from './Sidebar.svelte';

	import FaShoppingBasket from 'svelte-icons/fa/FaShoppingBasket.svelte';
	let open = false;
	import logo from '$lib/assets/stripekit.png';
	import { basket } from '../stores';
	import { fade } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	let basket_array;

	basket.subscribe((value) => {
		basket_array = value;
	});

	beforeNavigate(() => {
		open = false;
	});
</script>

<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 relative">
	<div class="container flex flex-wrap items-center justify-between mx-auto">
		<a href="/" class="flex items-center">
			<img src={logo} class="h-6 mr-0 sm:h-9" alt="Stripe kit" />
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>tripeKit</span
			>
		</a>
		<button
			data-collapse-toggle="navbar-default"
			type="button"
			class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded="false"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				><path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				/></svg
			>
		</button>
		<div class="hidden w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
			>
				<li>
					<div
						on:click={() => (open = !open)}
						on:keydown
						class="relative cursor-pointer block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent w-6"
					>
						<FaShoppingBasket />
						{#if basket_array.length > 0}
							<div
								in:fade
								out:fade
								class="absolute aspect-square rounded-full w-6 h-6 flex items-center justify-center bg-gray-700 -right-6 -top-4"
							>
								{basket_array.length > 0 ? basket_array.length : ''}
							</div>
						{/if}
					</div>
				</li>
			</ul>
		</div>
	</div>
	{#if open}
		<div class="absolute right-8 top-4 z-50">
			<div on:click={() => (open = false)} class="font-bold text-3xl cursor-pointer">X</div>
		</div>
	{/if}
	<Sidebar {open} />
</nav>
