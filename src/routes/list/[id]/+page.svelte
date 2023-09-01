<script lang="ts">
	import type { PageData } from '../../list/[id]/$types';
	import { user, lists, todos } from '$lib/stores';
	import { page } from '$app/stores';

	$: id = $page.params.id;
	$: list = $lists.filter((list) => list.id === id)[0];
	$: listTodos = $todos.filter((todo) => todo.list === id);
</script>

<h1>{list.name}</h1>

{#each listTodos as todo}
	<p>{todo.task}</p>
{/each}
