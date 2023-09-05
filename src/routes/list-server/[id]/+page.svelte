<script lang="ts">
	import type { PageData } from '../../list-server/[id]/$types';
	import { user, lists, todos } from '$lib/stores';
	import { page } from '$app/stores';
	import plus from '$lib/assets/plus.svg';
	import type { ChangeEventHandler } from 'svelte/elements';
	import type { Todo } from '$lib/types';

	$: id = $page.params.id;
	$: list = $lists.filter((list) => list.id === id)[0];
	$: listTodos = $page.data.todos.filter((todo: Todo) => todo.list === id) as Todo[];

	function submitForm(id: string) {
		const form = document.getElementById(id) as HTMLFormElement;
		if (form) form.submit();
	}

	let renameModal: HTMLDialogElement;
	let deleteModal: HTMLDialogElement;
</script>

<!-- Start Todo List View -->
<div class="h-full w-4/5 mt-10 flex flex-col items-center">
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
				<button class="btn" on:click={() => renameModal.showModal()}>Rename</button>
				<!-- svelte-ignore a11y-missing-attribute -->
				<button class="btn" on:click={() => deleteModal.showModal()}>Delete</button>
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
			<button class="btn btn-square btn-ghost text-3xl ml-5">
				<span class="mb-1">+</span>
				<!-- <img src={plus} alt="+" /> -->
			</button>
		</form>
	</div>
	<!-- Show list todos -->
	<div class="w-3/4 flex flex-col items-center justify-center mt-10">
		{#each listTodos as todo}
			<form
				id={todo.id}
				method="post"
				action="?/updateTodo"
				class="w-full flex justify-between mb-2"
			>
				<input type="hidden" name="id" value={todo.id} />
				<input type="hidden" name="list" value={todo.list} />
				<input
					type="checkbox"
					name="completed"
					class="checkbox my-auto mr-4"
					checked={todo.completed}
					on:change={() => submitForm(todo.id)}
				/>

				<input
					type="text"
					name="task"
					bind:value={todo.task}
					class="input input-ghost w-full"
					on:change={() => submitForm(todo.id)}
				/>
				<button formaction="?/deleteTodo" class="btn btn-square btn-ghost ml-2">
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

<!-- Rename modal -->
<dialog bind:this={renameModal} class="modal">
	<form method="dialog" class="modal-box bg-base-200">
		<h3 class="font-bold text-lg">Update list name!</h3>
		<form id="update-list-name" method="post" action="?/updateListName">
			<input type="hidden" name="id" value={list.id} />
			<input
				type="text"
				name="name"
				value={list.name}
				on:change={() => submitForm('update-list-name')}
				class="input input-bordered w-full my-5"
			/>
		</form>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
<!-- End Rename modal -->
<!-- Delete modal -->
<dialog bind:this={deleteModal} class="modal">
	<form method="dialog" class="modal-box bg-base-200">
		<h3 class="font-bold text-lg w-full text-center mt-5">
			Are you sure you want to delete this list?
		</h3>
		<form
			id="delete-list"
			method="post"
			action="?/deleteList"
			class="flex items-center justify-center"
		>
			<input type="hidden" name="id" value={list.id} />

			<button class="btn btn-neutral w-20 m-2">Yes</button>
			<button class="btn btn-neutral w-20 mx-2 my-5" formaction="?/blank">No</button>
		</form>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
<!-- End Delete modal -->
