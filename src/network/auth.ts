import { apiRequest, server } from './apiConfig';

export const verifyUser = async () => {
	return apiRequest(async () => {
		const res = await server.get('auth');

		return res.data;
	});
};

interface LoginCredentials {
	email: string;
	password: string;
}

export const login = async (credentials: LoginCredentials) => {
	return apiRequest(async () => {
		const res = await server.post('auth/login', credentials);

		return res.data;
	});
};

export const logout = async () => {
	return apiRequest(async () => {
		const res = await server.post('auth/logout');

		return res.data;
	});
};
