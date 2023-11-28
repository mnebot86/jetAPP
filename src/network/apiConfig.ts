import axios, { AxiosError } from 'axios';
import * as Device from 'expo-device';

let BASE_URL: undefined | string;

switch (Device.osName) {
	case 'Android':
		BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_Android;
		break;
	case 'iOS':
		BASE_URL = process.env.EXPO_PUBLIC_BASE_URL_IOS;
		break;
	default:
		BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
		break;
}

export const server = axios.create({
	baseURL: BASE_URL,
	headers: {
		Accept: 'application/json',
	},
});

export const handleApiError = (error: AxiosError) => {
	if (error.response) {
		return error.response.data;
	} else if (error.request) {
		return 'No Response Received';
	} else {
		return error.message;
	}
};

export const apiRequest = async <T>(request: () => Promise<T>) => {
	try {
		return await request();
	} catch (error) {
		if (error instanceof AxiosError) {
			return handleApiError(error);
		} else {
			throw error;
		}
	}
};
