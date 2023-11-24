import { apiRequest, server } from './apiConfig';
import { FormationResponse } from './formation';

interface PlaybookData {
	name: string;
}

export interface PlaybookResponse {
	name: string;
	formations: FormationResponse[] | string[];
	group: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	error?: string;
}

export const createPlaybook = async (data: PlaybookData) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: 'playbooks',
			data,
		};

		const res = await server(config);

		return res.data as PlaybookResponse;
	});
};

export const getPlaybooks = async () => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: 'playbooks',
		};

		const res = await server(config);

		return res.data as PlaybookResponse[];
	});
};

export const getPlaybook = async (playbookId: string) => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: `playbooks/${playbookId}`,
		};

		const res = await server(config);

		return res.data as PlaybookResponse;
	});
};
