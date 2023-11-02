import { AvatarResponse } from 'utils/interface';

import { apiRequest, server } from './apiConfig';

export const uploadAvatar = async (formData: FormData) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: 'avatar',
			headers: { 'Content-Type': 'multipart/form-data' },
			data: formData,
		};

		const res = await server(config);

		return res.data as AvatarResponse;
	});
};

export const deleteAvatar = async (imageId: string) => {
	return apiRequest(async () => {
		const config = {
			method: 'delete',
			url: `avatar/${imageId}`,
		};

		const res = await server(config);

		return res.data;
	});
};
