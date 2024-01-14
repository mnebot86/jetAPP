import { apiRequest, server } from './apiConfig';

interface GameFilmData {
	team: string;
}

export interface Comment {
	comment: string;
	playerTags: string[];
	createdBy: string;
}

export interface GameVideo {
	_id: string;
	url: string;
	comments: Comment[];
}

export interface GameFilmResponse {
	team: string;
	videos: GameVideo[];
	date: string;
	group: string;
	_id: string;
	createdAt: string;
	updated: string;
	error?: string | null;
}

export const createGameFilm = async (data: GameFilmData) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: 'game-films',
			data,
		};

		const res = await server(config);

		return res.data as GameFilmResponse;
	});
};

export const getGameFilms = async () => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: 'game-films',
		};

		const res = await server(config);

		return res.data as GameFilmResponse[];
	});
};

export const getGameFilm = async (id: string) => {
	return apiRequest(async () => {
		const config = {
			method: 'get',
			url: `game-films/${id}`,
		};

		const res = await server(config);

		return res.data as GameFilmResponse;
	});
};

export const uploadGameFilms = async (formData: FormData, id: string) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: `game-films/${id}/videos`,
			headers: { 'Content-Type': 'multipart/form-data' },
			data: formData,
		};

		const res = await server(config);

		return res.data as string[];
	});
};
