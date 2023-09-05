<script lang="ts">
	import { lists } from '$lib/stores';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { Todo } from '$lib/types';

	$: id = $page.params.id;
	$: list = $lists.filter((list) => list.id === id)[0];

	let todos: Todo[] = [];

	async function getTodos() {
		console.log('rolling');

		try {
			const response = await fetch('/list-client/[id]');
			let todosJSON = await response.json();
			console.log(todosJSON);

			// Extract todos from response and set to todos
		} catch (error) {
			console.log(error);
		}
	}
	onMount(getTodos);
</script>

<h1>[Client] list</h1>
