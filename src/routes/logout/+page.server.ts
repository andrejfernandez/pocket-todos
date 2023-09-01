import { redirect } from '@sveltejs/kit';

// @ts-ignore
export function load({ locals }) {
	if (locals.pb.authStore.token) locals.pb.authStore.clear();
	throw redirect(303, '/');
}
