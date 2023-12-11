import { server } from './apiConfigV2';

export type PlayData = {
	_id: string;
	name: string;
	description: string;
	formation: string[];
	image: {
		cloudinaryId: string;
		url: string;
	};
	createdAt: string;
	updatedAt: string;
};

export type FormationResponse = {
	name: string;
	image: {
		url: string;
		cloudinaryId: string;
	};
	plays: PlayData[];
	playbook: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
	error?: string;
};

type FormationData = {
	name: string;
};

export const createFormation = async (
	data: FormationData,
	id: string
): Promise<FormationResponse> => {
	const response = await server.post(`playbooks/${id}/formations`, data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	return response.data;
};

export const getFormation = async (
	playbookId: string,
	formationId: string
): Promise<FormationResponse> => {
	const response = await server.get(`playbooks/${playbookId}/formations/${formationId}`);

	return response.data;
};
