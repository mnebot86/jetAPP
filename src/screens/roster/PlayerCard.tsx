import { Text, HStack, Avatar, AvatarImage } from '@gluestack-ui/themed';
import React from 'react';
import { PlayerResponse } from 'utils/interface';

const PlayerCard = ({ firstName, lastName, avatar, jerseyNumber }: PlayerResponse) => {
	return (
		<HStack
			borderBottomColor="#00000040"
			borderBottomWidth={1}
			paddingHorizontal={10}
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

			<Text>{jerseyNumber ? `# ${jerseyNumber}` : '#'}</Text>
		</HStack>
	);
};

export default PlayerCard;
