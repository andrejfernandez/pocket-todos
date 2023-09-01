import type { User, List } from '$lib/types';
import { writable } from 'svelte/store';

export const user = writable<User>();
export const lists = writable<List[]>([]);
