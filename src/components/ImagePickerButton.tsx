import { Button, ButtonIcon } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'lucide-react-native';
import React from 'react';

type ImagePickerButtonProps = {
	setImage: (url: string) => void;
};

const ImageUploadButton = ({ setImage }: ImagePickerButtonProps) => {
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

			setImage(uri);
		}
	};

	return (
		<Button action="secondary" onPress={pickImage}>
			<ButtonIcon as={Image} />
		</Button>
	);
};

export default ImageUploadButton;
