import { HStack, Icon } from '@gluestack-ui/themed';
import { PlusSquare } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface HeaderProps {
	toggle: () => void;
}

const Header = ({ toggle }: HeaderProps) => {
	return (
		<HStack p={8}>
			<TouchableOpacity onPress={toggle}>
				<Icon as={PlusSquare} size="xl" />
			</TouchableOpacity>
		</HStack>
	);
};

export default Header;
