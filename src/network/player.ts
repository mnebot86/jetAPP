import { AvatarResponse, PlayerResponse } from 'utils/interface';

import { apiRequest, server } from './apiConfig';

interface PlayerData {
	avatar: AvatarResponse;
	firstName: string;
	lastName: string;
	medicalConditions?: string[];
	allergies?: string[];
}

interface PlayerDataEdit {
	avatar?: AvatarResponse;
	firstName?: string;
	lastName?: string;
	medicalConditions?: string[];
	allergies?: string[];
}

export const createPlayer = async (data: PlayerData) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: 'players',
			data,
		};

		const res = await server(config);

		return res.data as PlayerResponse;
	});
};

export const updatePlayer = async (id: string, data: PlayerDataEdit) => {
	return apiRequest(async () => {
		const config = {
			method: 'patch',
			url: `players/${id}`,
			data,
		};

		const res = await server(config);

		return res.data as PlayerResponse;
	});
};

export const getPlayers = async () => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: 'players',
		};

		const res = await server(config);

		return res.data as PlayerResponse[];
	});
};

export const getPlayer = async (playerId: string) => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: `players/${playerId}`,
		};

		const res = await server(config);

		return res.data as PlayerResponse;
	});
};
