import { Ionicons } from '@expo/vector-icons';
import { HStack } from '@gluestack-ui/themed';
import React from 'react';

interface ControlsHeaderProps {
	toggle: () => void;
}

const ControlsHeader = ({ toggle }: ControlsHeaderProps) => {
	return (
		<HStack p={8} justifyContent="space-between">
			<Ionicons name="add-circle" size={30} color="black" onPress={toggle} />
		</HStack>
	);
};

export default ControlsHeader;
