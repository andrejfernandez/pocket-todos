import type { Actions } from './$types';
import type { NewUser } from '$lib/types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ locals, request }) => {
		// Get form data
		const formData = await request.formData();
		const data = Object.fromEntries(formData.entries());

		// Create new user object
		const userData: NewUser = {
			name: data.name.toString(),
			email: data.email.toString(),
			password: data.password.toString(),
			passwordConfirm: data.passwordConfirm.toString(),
			emailVisibility: true
		};

		// Create new user
		try {
			const createUser = await locals.pb.collection('users').create(userData);
		} catch (error: any) {
			console.log('Failed to create user: ', error.response.data);
			return {
				error: true,
				message: error.response.data
			};
		}
		throw redirect(303, '/login');
	}
} satisfies Actions;
