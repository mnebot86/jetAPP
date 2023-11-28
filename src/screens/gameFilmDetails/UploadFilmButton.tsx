import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import * as ImagerPicker from 'expo-image-picker';
import { Video } from 'lucide-react-native';
import React from 'react';

import { VideoData } from './AddGameFilmModal';

interface UploadFilmButtonProps {
	setSelectedVideos: (videos: VideoData[]) => void;
	selectedVideos: VideoData[];
}

const UploadFilmButton = ({ selectedVideos, setSelectedVideos }: UploadFilmButtonProps) => {
	const pickVideos = async () => {
		try {
			const result = await ImagerPicker.launchImageLibraryAsync({
				allowsMultipleSelection: true,
				mediaTypes: ImagerPicker.MediaTypeOptions.Videos,
				orderedSelection: true,
				videoQuality: 1,
				selectionLimit: 20,
			});

			if (!result.canceled) {
				const videos = result.assets.map(asset => asset) as VideoData[];

				setSelectedVideos(videos);
			} else {
				alert('You did not select any image.');
			}
		} catch (error) {
			console.error('Error picking videos', error);
		}
	};

	return (
		<Button onPress={pickVideos}>
			<ButtonIcon as={Video} />
			<ButtonText pl="$3">{selectedVideos.length}</ButtonText>
		</Button>
	);
};

export default UploadFilmButton;
