export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	roles: string[];
	expoPushTokens: string[];
	group: string;
	createdAt: string;
	updatedAt: string;
}

export interface LoginResponse {
	user?: User;
	error?: string;
}
