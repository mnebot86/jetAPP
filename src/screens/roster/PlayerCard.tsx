import { Text, HStack, Avatar, AvatarImage } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { PlayerResponse } from 'utils/interface';

const PlayerCard = ({ firstName, lastName, avatar, jerseyNumber, _id }: PlayerResponse) => {
	type Navigation = any;

	const navigation: Navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('PlayerDetails', {
					_id,
				})
			}>
			<HStack
				paddingHorizontal={16}
				paddingVertical={20}
				alignItems="center"
				justifyContent="space-between">
				{avatar ? (
					<Avatar size="lg">
						<AvatarImage source={{ uri: avatar?.url }} />
					</Avatar>
				) : null}

				<Text>
					{firstName} {lastName}
				</Text>

				<Text>{jerseyNumber ? `# ${jerseyNumber}` : null}</Text>
			</HStack>
		</TouchableOpacity>
	);
};

export default PlayerCard;
