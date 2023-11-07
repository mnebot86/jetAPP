import { Box, ButtonGroup, ButtonText, Button, Center, Image } from '@gluestack-ui/themed';
import Constants from 'expo-constants';
import React, { useCallback } from 'react';

interface PreviewProps {
	profileImage: string | null;
	togglePreviewOpen: () => void;
	toggleCameraOpen: () => void;
}

const Preview = ({ profileImage, togglePreviewOpen, toggleCameraOpen }: PreviewProps) => {
	const onRetake = useCallback(() => {
		toggleCameraOpen();
		togglePreviewOpen();
	}, [toggleCameraOpen, togglePreviewOpen]);

	const onSave = useCallback(() => {
		togglePreviewOpen();
	}, [togglePreviewOpen]);

	return (
		<Box
			flex={1}
			pt={Constants.statusBarHeight}
			paddingHorizontal={10}
			bg="black"
			position="absolute"
			top={0}
			left={0}
			right={0}
			bottom={0}
			zIndex={100}>
			{profileImage ? (
				<Image
					flex={1}
					w="$full"
					source={profileImage}
					alt="Profile image"
					resizeMode="cover"
					role="img"
				/>
			) : null}

			<Center pt={Constants.statusBarHeight} pb={Constants.statusBarHeight}>
				<ButtonGroup>
					<Button size="lg" variant="outline">
						<ButtonText onPress={onRetake}>Retake</ButtonText>
					</Button>

					<Button size="lg" onPress={onSave}>
						<ButtonText>Save</ButtonText>
					</Button>
				</ButtonGroup>
			</Center>
		</Box>
	);
};

export default Preview;
