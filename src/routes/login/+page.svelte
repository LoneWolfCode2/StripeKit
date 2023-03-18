<script lang="ts">
</script>

<main
	class="grid place-items-center  min-h-screen bg-gradient-to-r from-[#42275a] to-[#734b6d] text-white  "
>
	<h1 class="text-6xl">ADMIN Login</h1>
	<form action="?/login" method="POST" class="auth-form flex flex-col text-center text-2xl gap-2">
		<label for=""> Email </label>
		<input type="text" name="email" />
		<label for=""> Password </label>
		<input type="password" name="password" />
		<button type="submit" class="btn btn-primary">Login</button>
	</form>
</main>

<style>
	input {
		color: black;
		padding: 6px 12px;
		border-radius: 6px;
	}
</style>
