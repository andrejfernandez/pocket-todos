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
		<!-- Page content -->
		<slot />
		<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" class="drawer-overlay" />
		<div class="flex flex-col items-start p-4 w-80 min-h-full bg-base-200 text-base-content">
			<!-- Sidebar content -->
			<div class="flex">
				<h1 class="text-2xl font-bold pl-4">Pocket Todos</h1>
				<Swap />
			</div>
			{#if user}
				<h1 class="text-xl font-light pl-4 text-center">Welcome, {user.name}</h1>
			{:else}
				<ul class="menu w-full">
					<li><a href="/login">Login</a></li>
					<li><a href="/register">Register</a></li>
				</ul>
			{/if}

			{#if user}
				<button
					class="btn btn-outline fixed bottom-0 mb-5"
					on:click={() => {
						window.location.href = '/logout';
					}}>Logout</button
				>
			{/if}
		</div>
	</div>
</div>
