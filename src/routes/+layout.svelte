<script lang="ts">
	import '../app.css';
	import Swap from '$lib/components/Swap.svelte';
	import type { RecordModel, AdminModel } from 'pocketbase';
	export let data;
	$: user = data?.user;
</script>

<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center justify-center">
		<slot />
		<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			{#if user}
				<h1 class="text-2xl text-center">Welcome, {user.name}</h1>
				<li><a href="/logout" target="_self">Logout</a></li>
			{:else}
				<li><a href="/login">Login</a></li>
				<li><a href="/register">Register</a></li>
			{/if}
		</ul>
	</div>
</div>
