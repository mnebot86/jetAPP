import { apiRequest, server } from './apiConfig';

interface GameFilmData {
	team: string;
}

export interface Comment {
	videoTimestamp: number;
	comment: string;
	playerTags: string[];
	createdBy: AccountUser;
}

export interface GameVideo {
	_id: string;
	url: string;
	comments: Comment[];
}

export interface AccountUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	roles: string[];
	position: string;
	exportedGames: string[];
	createdAt: string;
	updatedAt: string;
	group: string;
}

export interface GameFilmResponse {
	team: string;
	videos: GameVideo[];
	date: string;
	group: string;
	_id: string;
	createdAt: AccountUser;
	updated: string;
	error?: string | null;
}

export interface VideoResponse {
	_id: string;
	url: string;
	createdAt: string;
	updatedAt: string;
	comments: Comment[];
}

export interface AddVideoCommentProps {
	videoTimestamp: number;
	comment: string;
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

export const addVideoComment = async (
	gameFilmId: string,
	videoId: string,
	data: AddVideoCommentProps
) => {
	return apiRequest(async () => {
		const config = {
			method: 'post',
			url: `game-films/${gameFilmId}/videos/${videoId}`,
			data,
		};

		const res = await server(config);

		return res.data as VideoResponse;
	});
};
