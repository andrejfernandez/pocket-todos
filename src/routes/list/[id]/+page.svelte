<script lang="ts">
	import type { PageData } from '../../list/[id]/$types';
	import { user, lists } from '$lib/stores';
	import { page } from '$app/stores';

	$: id = $page.params.id;
	$: list = $lists.filter((list) => list.id === id)[0];
	$: $page;
</script>

<h1>{list.name}</h1>
