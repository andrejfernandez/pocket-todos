<script lang="ts">
	import type { PageData } from '../../list/[id]/$types';
	import { user, lists, todos } from '$lib/stores';
	import { page } from '$app/stores';
	import plus from '$lib/assets/plus.svg';
	import type { ChangeEventHandler } from 'svelte/elements';
	import type { Todo } from '$lib/types';

	$: id = $page.params.id;
	$: list = $lists.filter((list) => list.id === id)[0];
	$: listTodos = $page.data.todos.filter((todo: Todo) => todo.list === id);

	function submitForm(id: string) {
		const form = document.getElementById(id) as HTMLFormElement;
		if (form) form.submit();
	}
</script>

<!-- Start Todo List View -->
<div class="min-h-screen w-4/5 mt-10 flex flex-col items-center">
	<!-- List Navbar -->
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<!-- Navbar title -->
			<!-- svelte-ignore a11y-missing-attribute -->
			<a class="btn btn-ghost normal-case text-2xl">{list.name}</a>
		</div>
		<div class="flex-none relative dropdown dropdown-end">
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-5 h-5 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					/></svg
				>
			</button>
			<!-- Navbar Actions -->
			<ul class="menu menu-md mt-1 dropdown-content bg-base-200 rounded-box">
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><a>Delete</a></li>
				<!-- svelte-ignore a11y-missing-attribute -->
				<li><a>Rename</a></li>
			</ul>
		</div>
	</div>
	<!-- New Todo Bar -->
	<div class="w-full flex items-center justify-center">
		<form method="POST" action="?/addTodo" class="flex items-center justify-center mt-5 w-3/4">
			<input type="hidden" name="list" value={list.id} />
			<input
				name="task"
				type="text"
				placeholder="What needs to be done?"
				class="input input-bordered bg-transparent w-full"
			/>
			<button class="btn btn-square btn-ghost text-xl ml-5">
				<img src={plus} alt="+" />
			</button>
		</form>
	</div>
	<!-- Show list todos -->
	<div class="w-3/4 flex flex-col items-center justify-center mt-10">
		{#each listTodos as todo (todo.id)}
			<form
				id={todo.id}
				method="post"
				action="?/updateTodo"
				class="w-full flex justify-between mb-2"
			>
				<input type="hidden" name="id" value={todo.id} />
				<input type="hidden" name="list" value={todo.list} />
				<input type="hidden" name="completed" value={todo.completed} />

				<input
					type="checkbox"
					name="completedBox"
					class="checkbox checkbox-lg my-auto mr-4"
					bind:value={todo.completed}
					on:click={() => {
						todo.completed = !todo.completed;
						submitForm(todo.id);
					}}
				/>
				<input
					type="text"
					name="task"
					bind:value={todo.task}
					class="input input-ghost w-full"
					on:change={() => submitForm(todo.id)}
				/>
				<button class="btn btn-square btn-ghost ml-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
				</button>
			</form>
		{/each}
	</div>
</div>
<!-- End Todo List View -->
