import { Button, ButtonIcon } from '@gluestack-ui/themed';
import { FlashMode } from 'expo-camera';
import { Zap, ZapOff, SunMoon } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';

interface FlashButtonProps {
	toggle: () => void;
	flashMode: string;
}

const FlashButton = ({ toggle, flashMode }: FlashButtonProps) => {
	const getFlashModeIcon = () => {
		switch (flashMode) {
			case FlashMode.on:
				return Zap;
			case FlashMode.off:
				return ZapOff;
			default:
				return SunMoon;
		}
	};

	return (
		<Button onPress={toggle} bg="transparent" size="lg">
			<ButtonIcon as={getFlashModeIcon()} size="lg" />
		</Button>
	);
};

export default FlashButton;
