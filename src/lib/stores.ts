import type { User, List, Todo } from '$lib/types';
import { writable } from 'svelte/store';

export const user = writable<User>();
export const lists = writable<List[]>([]);
export const todos = writable<Todo[]>([]);
