import { Ionicons } from '@expo/vector-icons';
import { HStack, Pressable } from '@gluestack-ui/themed';
import React from 'react';

interface ControlsHeaderProps {
	toggle: () => void;
}
const ControlsHeader = ({ toggle }: ControlsHeaderProps) => {
	return (
		<HStack p={8} justifyContent="space-between">
			<Pressable onPress={toggle}>
				{({ pressed }: { pressed: boolean }) => (
					<Ionicons
						name="person-add"
						size={24}
						style={{
							transform: `scale(${pressed ? 0.9 : 1})`,
							opacity: pressed ? 0.5 : 1,
						}}
						color="black"
					/>
				)}
			</Pressable>
		</HStack>
	);
};

export default ControlsHeader;
