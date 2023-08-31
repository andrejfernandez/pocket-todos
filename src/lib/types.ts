export interface NewUser {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	emailVisibility: boolean;
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
