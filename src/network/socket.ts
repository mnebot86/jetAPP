import * as Device from 'expo-device';
import io from 'socket.io-client';

let BASE_URL: undefined | string;

switch (Device.osName) {
	case 'Android':
		BASE_URL = process.env.EXPO_PUBLIC_BASE_ANDROID_SOCKET_IP;
		break;
	case 'iOS':
		BASE_URL = process.env.EXPO_PUBLIC_BASE_IOS_SOCKET_IP;
		break;
	default:
		BASE_URL = process.env.EXPO_PUBLIC_BASE_SOCKET_IP;
		break;
}

export const socket = io(BASE_URL as string);
