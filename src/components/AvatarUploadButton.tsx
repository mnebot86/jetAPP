import { Button, ButtonIcon } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'lucide-react-native';
import { uploadAvatar } from 'network/avatar';
import React, { useCallback, useEffect } from 'react';
import { AvatarResponse } from 'utils/interface';

interface AvatarUploadButtonProps {
	id: string;
	profileImage: string | null;
	setProfileImage: (image: string) => void;
	setAvatar: (avatar: AvatarResponse) => void;
}

const AvatarUploadButton = ({
	profileImage,
	setProfileImage,
	setAvatar,
	id,
}: AvatarUploadButtonProps) => {
	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== 'granted') {
			alert('Sorry, we need camera roll permission to make this work!');
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
		});

		if (!result.canceled && result.assets.length > 0) {
			const { uri } = result.assets[0];

			setProfileImage(uri);
		}
	};

	const sendImage = useCallback(async () => {
		if (!profileImage) {
			return;
		}

		const formData = new FormData();

		const type = profileImage.split('.')[1];

		formData.append('avatar', {
			uri: profileImage,
			name: `${id}_avatar`,
			type: `image/${type}`,
		} as any);

		formData.append('uniqueId', id);

		try {
			const avatarData = await uploadAvatar(formData);

			setAvatar(avatarData as AvatarResponse);
		} catch (error) {
			console.error('Error uploading avatar', error);
		}
	}, [profileImage, id, setAvatar]);

	useEffect(() => {
		if (profileImage) {
			sendImage();
		}
	}, [profileImage, sendImage]);

	return (
		<Button action="secondary" onPress={pickImage}>
			<ButtonIcon as={Image} />
		</Button>
	);
};

export default AvatarUploadButton;
