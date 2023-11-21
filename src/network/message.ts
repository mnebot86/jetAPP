import { apiRequest, server } from './apiConfig';

export interface MessageResponse {
	_id: string;
	message: string;
	group: string;
	createdBy: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		roles: string[];
		position: string;
		expoPushTokens: string[] | [];
		createdAt: string;
		updatedAt: string;
		group: string;
	},
	createdAt: string;
	updatedAt: string;
}

interface createMessageProps {
	message: string;
}

export const createMessage = async (data: createMessageProps) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: 'messages',
			data,
		};

		const res = await server(config);

		return res.data as MessageResponse;
	});
};

export const getAllMessages = async () => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: 'messages',
		};

		const res = await server(config);

		return res.data as MessageResponse[];
	});
};
