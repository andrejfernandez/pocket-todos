import type { Actions } from './$types';
import type { NewList } from '$lib/types';
import { user } from '$lib/stores';
import { page, navigating } from '$app/stores';

export const actions = {
	addlist: async ({ locals, request }) => {
		console.log('addlist action');
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
