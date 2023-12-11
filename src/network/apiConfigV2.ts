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
		'Content-Type': 'application/json',
	},
});
