<script land="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import Sidebar from '../components/Sidebar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Navbar />
<slot />
