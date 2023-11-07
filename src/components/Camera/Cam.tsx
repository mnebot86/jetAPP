import { Box, CloseIcon, HStack, Icon, Pressable } from '@gluestack-ui/themed';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import Constants from 'expo-constants';
import { SwitchCamera } from 'lucide-react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import FlashButton from './FlashButton';
import { PhotoButton } from './PhotoButton';

interface CamProps {
	onClose: () => void;
	setProfileImage: (url: string) => void;
	togglePreviewOpen: () => void;
}

const Cam = ({ onClose, setProfileImage, togglePreviewOpen }: CamProps) => {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [camera, setCamera] = useState<Camera | undefined>(undefined);
	const [flashMode, setFlashMode] = useState(FlashMode.auto);

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

			setProfileImage(data.uri);
			togglePreviewOpen();
			onClose();
		}
	}, [camera, onClose, setProfileImage, togglePreviewOpen]);

	const toggleFlash = useCallback(() => {
		setFlashMode(prevMode => {
			switch (prevMode) {
				case FlashMode.on:
					return FlashMode.off;
				case FlashMode.off:
					return FlashMode.auto;
				default:
					return FlashMode.on;
			}
		});
	}, []);

	return (
		<Box
			flex={1}
			position="absolute"
			top="$0"
			right={0}
			left={0}
			bottom={0}
			paddingHorizontal={12}
			bg="black">
			<HStack
				m={20}
				justifyContent="space-between"
				alignItems="center"
				paddingTop={Constants.statusBarHeight}>
				<Pressable onPress={toggleCameraType}>
					<Icon as={SwitchCamera} size="lg" color="white" />
				</Pressable>

				<FlashButton toggle={toggleFlash} flashMode={flashMode} />

				<TouchableOpacity onPress={onClose}>
					<Icon as={CloseIcon} size="lg" color="white" />
				</TouchableOpacity>
			</HStack>

			<Camera
				style={{
					flex: 1,
					borderColor: '#FFFFFF99',
					borderWidth: 1,
				}}
				type={type}
				ref={ref => {
					if (ref) setCamera(ref);
				}}
				ratio="1:1"
				flashMode={flashMode}
			/>

			<HStack m={20} mb={30} justifyContent="center">
				<PhotoButton takePicture={takePicture} />
			</HStack>
		</Box>
	);
};

export default Cam;
