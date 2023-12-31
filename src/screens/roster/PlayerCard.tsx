import { Text, HStack, Avatar, AvatarImage } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { PlayerResponse } from 'utils/interface';

const PlayerCard = memo(({ firstName, lastName, avatar, jerseyNumber, _id }: PlayerResponse) => {
	type Navigation = any;

	const navigation: Navigation = useNavigation();

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('PlayerDetails', {
					_id,
					name: lastName,
				})
			}>
			<HStack
				hardShadow="1"
				bg="$light50"
				alignSelf="center"
				width="90%"
				borderWidth={1}
				borderColor="$backgroundLight500"
				borderRadius={8}
				paddingHorizontal={16}
				paddingVertical={20}
				alignItems="center"
				justifyContent="space-between">
				{avatar ? (
					<Avatar size="lg">
						<AvatarImage
							source={{ uri: avatar?.url }}
							borderWidth={1}
							borderColor="$borderLight600"
							alt="Player Avatar"
						/>
					</Avatar>
				) : null}

				<Text bold color="$textDark900" size="lg">
					{firstName} {lastName}
				</Text>

				<Text color="$textLight500" size="lg">
					{jerseyNumber ? `# ${jerseyNumber}` : '# '}
				</Text>
			</HStack>
		</TouchableOpacity>
	);
});

export default PlayerCard;
