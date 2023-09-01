import type { Actions } from './$types';
import type { NewTodo } from '$lib/types';

export const actions = {
	addTodo: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		// Create new todo object
		const newTodo: NewTodo = {
			list: data.list.toString(),
			task: data.task.toString(),
			completed: false
		};

		// Add new todo to database
		const record = await locals.pb.collection('todos').create(newTodo);
	},
	updateTodo: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());
		console.table(data);
		// Create new todo object
		const updatedTodo: NewTodo = {
			id: data.id.toString(),
			list: data.list.toString(),
			task: data.task.toString(),
			completed: false
		};

		// Add new todo to database
		// const record = await locals.pb.collection('todos').create(newTodo);
	}
} satisfies Actions;
