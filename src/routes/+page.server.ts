import type { Actions } from './$types';
import type { NewList } from '$lib/types';

export const actions = {
	addList: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		const newList: NewList = {
			name: data.name.toString(),
			user: data.user.toString()
		};

		console.log(request.headers);

		// Add new list to database
		const record = await locals.pb.collection('todoLists').create(newList);
	}
} satisfies Actions;
