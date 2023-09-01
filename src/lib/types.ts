export interface NewUser {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	emailVisibility: boolean;
}

export interface NewList {
	name: string;
	user: string;
}

export interface NewTodo {
	id?: string;
	list: string;
	task: string;
	completed: boolean;
}

export interface User {
	avatar: string;
	collectionId: string;
	collectionName: string;
	created: string;
	email: string;
	emailVisibility: boolean;
	id: string;
	name: string;
	updated: string;
	username: string;
	verified: boolean;
}

export interface List {
	collectionId: string;
	collectionName: string;
	created: string;
	id: string;
	name: string;
	updated: string;
	user: string;
}

export interface Todo {
	collectionId: string;
	collectionName: string;
	completed: boolean;
	created: string;
	id: string;
	list: string;
	task: string;
	updated: string;
}
