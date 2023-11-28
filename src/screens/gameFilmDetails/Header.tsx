import { HStack, Icon } from '@gluestack-ui/themed';
import { PlusSquareIcon } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface HeaderProps {
	toggle: () => void;
}

const Header = ({ toggle }: HeaderProps) => {
	return (
		<HStack p="$2">
			<TouchableOpacity onPress={toggle}>
				<Icon as={PlusSquareIcon} size="xl" />
			</TouchableOpacity>
		</HStack>
	);
};

export default Header;
