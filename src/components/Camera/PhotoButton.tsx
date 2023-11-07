import { Button } from '@gluestack-ui/themed';
import React, { useCallback, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface PhotoButtonProps {
	takePicture: () => void;
}

export const PhotoButton = ({ takePicture }: PhotoButtonProps) => {
	const scaleValue = useRef(new Animated.Value(1)).current;

	const buttonAnimationScaleDown = useCallback(() => {
		Animated.timing(scaleValue, {
			toValue: 0.5,
			duration: 300,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, [scaleValue]);

	const buttonAnimationScaleUp = useCallback(() => {
		Animated.timing(scaleValue, {
			toValue: 1,
			duration: 300,
			easing: Easing.ease,
			useNativeDriver: false,
		}).start();
	}, [scaleValue]);
	return (
		<Button
			onPress={takePicture}
			onPressIn={buttonAnimationScaleDown}
			onPressOut={buttonAnimationScaleUp}
			width={50}
			height={50}
			borderRadius={50}
			borderWidth={2}
			borderStyle="solid"
			borderColor="white"
			justifyContent="center"
			alignItems="center"
			bg="transparent"
			p={0}
			m={5}>
			<Animated.View
				style={{
					width: 30,
					height: 30,
					borderRadius: 50,
					backgroundColor: 'white',
					transform: [{ scale: scaleValue }],
				}}
			/>
		</Button>
	);
};
