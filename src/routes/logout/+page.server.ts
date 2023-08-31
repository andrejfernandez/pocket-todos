import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.pb.authStore.token) locals.pb.authStore.clear();
	throw redirect(303, '/');
}
