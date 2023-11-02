import { AvatarResponse, PlayerResponse } from 'utils/interface';

import { apiRequest, server } from './apiConfig';

interface PlayerData {
	avatar: AvatarResponse;
	firstName: string;
	lastName: string;
	medicalConditions?: string[];
	allergies?: string[];
}

export const createPlayer = async (data: PlayerData) => {
	return apiRequest(async () => {
		const res = await server.post('/players', data);

		return res.data as PlayerResponse;
	});
};
