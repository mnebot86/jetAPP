import { AvatarResponse } from 'utils/interface';

import { apiRequest, server } from './apiConfig';

export const uploadAvatar = async (formData: FormData) => {
	return apiRequest(async () => {
		const res = await server.post('avatar', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		console.log('UPLOAD', res);
		return res.data as AvatarResponse;
	});
};
