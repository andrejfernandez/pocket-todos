import type { Actions } from './$types';
import type { NewTodo } from '$lib/types';
import { redirect } from '@sveltejs/kit';

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
		const newRecord = await locals.pb.collection('todos').create(newTodo);
	},
	updateTodo: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());
		console.log(formData);

		// Create new todo object
		const updatedTodo: NewTodo = {
			id: data.id.toString(),
			list: data.list.toString(),
			task: data.task.toString(),
			completed: data.completed ? true : false
		};

		// Add new todo to database
		const modRecord = await locals.pb.collection('todos').update(data.id.toString(), updatedTodo);
	},
	deleteTodo: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		// Delete todo from database
		const delRecord = await locals.pb.collection('todos').delete(data.id.toString());
	},
	updateListName: async ({ locals, request }) => {
		console.log('updateListName');
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());
		console.table(data);
		// Update list name in database
		const modRecord = await locals.pb
			.collection('todoLists')
			.update(data.id.toString(), { name: data.name.toString() });
	},
	deleteList: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		// Delete list from database
		try {
			const delRecord = await locals.pb.collection('todoLists').delete(data.id.toString());
		} catch (error) {
			console.log(error);
		}
		throw redirect(303, '/');
	},
	blank: async ({ locals, request }) => {
		console.log('Cancelled list delete');
	}
} satisfies Actions;
