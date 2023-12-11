import { server } from './apiConfigV2';

export type PlayResponse = {
	_id: string;
	name: string;
	description: string;
	image: {
		url: string;
		cloudinaryId: string;
	};
	formation: string;
	createdAt: string;
	updatedAt: string;
	error?: string;
};

export const createPlay = async (
	formData: FormData,
	playbookId: string,
	formationId: string
): Promise<PlayResponse> => {
	const response = await server.post(
		`playbooks/${playbookId}/formations/${formationId}/plays`,
		formData,
		{
			headers: { 'Content-Type': 'multipart/form-data' },
		}
	);

	return response.data;
};
