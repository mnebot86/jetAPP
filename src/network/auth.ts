import { apiRequest, server } from './apiConfig';

export const verifyUser = async () => {
	return apiRequest(async () => {
		const res = await server.get('auth');
		return res.data;
	});
};
