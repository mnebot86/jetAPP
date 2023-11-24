import { apiRequest, server } from './apiConfig';

export interface FormationResponse {
	name: string;
	image: {
		url: string;
		cloudinaryId: string;
	};
	plays: string[];
	playbook: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	error?: string;
}

interface FormationData {
	name: string;
}
export const createFormation = async (data: FormationData, id: string) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: `playbooks/${id}/formations`,
			data,
		};

		const res = await server(config);

		return res.data as FormationResponse;
	});
};
