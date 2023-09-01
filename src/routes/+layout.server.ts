import type { LayoutServerLoad } from './$types';
import type { User, List, Todo } from '$lib/types';

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		// Get user dand list ata
		const userData = locals.pb.authStore.model;
		console.log('Getting lists...');
		const listData = await locals.pb.collection('todoLists').getFullList({
			sort: '-created'
		});
		console.log('Getting todos...');
		const todoData = await locals.pb.collection('todos').getFullList({
			sort: '-created'
		});
		// Create user and list objects from data
		const user: User = userData as User;
		const lists: List[] = listData.map((list: any) => {
			return list as List;
		});
		const todos: Todo[] = todoData.map((todo: any) => {
			return todo as Todo;
		});

		return { user, lists, todos };
	} else {
		// TODO: Fix redirect to login page loop
		// throw redirect(303, '/login');
	}
}) satisfies LayoutServerLoad;
