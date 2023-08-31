import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		// Login = user
		try {
			const { token, record } = await locals.pb
				.collection('users')
				.authWithPassword(data.email.toString(), data.password.toString());
		} catch (error: any) {
			console.log('Failed to authenticate user: ', error.response);
			return {
				error: true,
				message: error.response.data
			};
		}
		throw redirect(303, '/');
	}
} satisfies Actions;
