<script lang="ts">
	import '../app.css';
	import Swap from '$lib/components/Swap.svelte';
	import plus from '$lib/assets/plus.svg';
	import { user, lists, todos } from '$lib/stores';

	export let data;
	// Update the stores
	$: if (data.user) user.set(data.user);
	$: if (data.lists) lists.set(data.lists);
	$: if (data.todos) todos.set(data.todos);
</script>

<!-- Start Drawer -->
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
				<a href="/" class="z-10 btn btn-ghost normal-case text-2xl font-bold">Pocket Todos</a>
				<Swap />
			</div>
			{#if $user}
				<!-- Show when logged in -->
				<h1 class="text-xl font-light pl-4 text-center">Welcome, {$user.name}</h1>
				<ul class="menu mt-8 w-full min-h-full bg-base-300 text-base-content">
					<!-- User's Todo Lists -->
					{#each $lists as list}
						<li style="background-color: #fffff;">
							<a href="/list-client/{list.id}">[Client] {list.name}</a>
							<a href="/list-server/{list.id}">[Server] {list.name}</a>
						</li>
					{/each}
				</ul>
				<!-- Add new Todo List -->
				<form method="POST" action="/?/addList" class="flex justify-between mt-5 w-full">
					<input
						name="name"
						type="text"
						placeholder="New list..."
						class="input input-bordered bg-transparent w-full max-w-xs"
					/>
					<input type="hidden" name="user" value={$user.id} />
					<button class="btn btn-square btn-ghost text-3xl ml-1">
						<!-- <img src={plus} alt="+" /> -->
						<span class="mb-1">+</span>
					</button>
				</form>
			{:else}
				<!-- Show actions for auth -->
				<ul class="menu w-full">
					<li><a href="/login">Login</a></li>
					<li><a href="/register">Register</a></li>
				</ul>
			{/if}

			{#if user}
				<!-- Logout button -->
				<div class="w-full flex justify-center">
					<button
						class="btn btn-outline fixed bottom-0 mb-5"
						on:click={() => {
							window.location.href = '/logout';
						}}>Logout</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
<!-- End Drawer -->
