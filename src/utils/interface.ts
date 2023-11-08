export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	roles: string[];
	expoPushTokens: string[];
	group: string;
	createdAt: string;
	updatedAt: string;
}

export interface LoginResponse {
	user?: User;
	error?: string;
}

export interface AvatarResponse {
	imageId: string;
	url: string;
}

export interface AvatarUploadProp {
	firstName: string;
	lastName: string;
	setAvatar: (url: AvatarResponse) => void;
	imagePlaceholder: string;
	setImagePlaceHolder: (url: string) => void;
	toggleIsCameraOpen: () => void;
}

export interface AVATAR {
	uri: string;
	name: string;
	type: string;
}

export interface PlayerResponse {
	_id: string;
	firstName: string;
	lastName: string;
	avatar: {
		url: string;
		imageId: string;
	};
	group: string;
	isStriper: boolean;
	positions: string[];
	totalAbsent: number;
	jerseyNumber: number | null;
	allergies: string[];
	medicalConditions: string[];
	createdAt: string;
	updateAt: string;
	error?: string;
}
