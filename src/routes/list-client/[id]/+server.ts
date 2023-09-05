import type { Todo } from '$lib/types';
import { json } from '@sveltejs/kit';

export function GET = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		// Get user dand list ata
		const userData = locals.pb.authStore.model;

		console.log('Getting todos...');
		const todoData = await locals.pb.collection('todos').getFullList({
			sort: '-created'
		});
	
		const todos: Todo[] = todoData.map((todo: any) => {
			return todo as Todo;
		});

		return json({});
	} else {
		// TODO: Fix redirect to login page loop
		// throw redirect(303, '/login');
	}
}) 