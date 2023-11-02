import { HStack, Button, ButtonIcon } from '@gluestack-ui/themed';
import { UserPlus } from 'lucide-react-native';
import React from 'react';

interface ControlsHeaderProps {
	toggle: () => void;
}

const ControlsHeader = ({ toggle }: ControlsHeaderProps) => {
	return (
		<HStack p={8} justifyContent="space-between">
			<Button borderRadius="$full" paddingHorizontal="$2.5" size="sm" onPress={toggle}>
				<ButtonIcon as={UserPlus} />
			</Button>
		</HStack>
	);
};

export default ControlsHeader;
