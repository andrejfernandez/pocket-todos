import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
	if (locals.pb.authStore.isValid) {
		const user = locals.pb.authStore.model;
		return { user };
	} else {
		// TODO: Fix redirect to login page loop
		// throw redirect(303, '/login');
	}
}) satisfies LayoutServerLoad;
