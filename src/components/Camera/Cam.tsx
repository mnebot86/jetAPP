import { MaterialIcons } from '@expo/vector-icons';
import { Box, CloseIcon, HStack, Icon } from '@gluestack-ui/themed';
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import { PhotoButton } from './PhotoButton';

interface CamProps {
	onClose: () => void;
	setImagePlaceholder: (url: string) => void;
}

const Cam = ({ onClose, setImagePlaceholder }: CamProps) => {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [camera, setCamera] = useState<Camera | undefined>(undefined);

	useEffect(() => {
		if (!permission) {
			requestPermission();
		} else if (!permission.granted) {
			setCamera(undefined);
			Alert.alert('Permission denied to use camera');
		}
	}, [permission, requestPermission]);

	const toggleCameraType = async () => {
		setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
	};

	const takePicture = useCallback(async () => {
		if (camera) {
			const data = await camera.takePictureAsync(undefined);

			setImagePlaceholder(data.uri);
			onClose();
		}
	}, [camera, onClose, setImagePlaceholder]);

	return (
		<Box flex={1} position="absolute" top="$0" right={0} left={0} bottom={0} zIndex={1}>
			<Camera
				style={{ flex: 1, justifyContent: 'space-between' }}
				type={type}
				ref={ref => {
					if (ref) setCamera(ref);
				}}
				ratio="1:1">
				<HStack m={20} justifyContent="space-between">
					<MaterialIcons
						name="flip-camera-ios"
						size={30}
						color="white"
						onPress={toggleCameraType}
					/>

					<TouchableOpacity onPress={onClose}>
						<Icon as={CloseIcon} size="lg" color="white" />
					</TouchableOpacity>
				</HStack>

				<HStack bg="black" m={20} mt="$full" justifyContent="center">
					<PhotoButton takePicture={takePicture} />
				</HStack>
			</Camera>
		</Box>
	);
};

export default Cam;
