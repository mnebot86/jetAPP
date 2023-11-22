import { Box, FlatList, Text } from '@gluestack-ui/themed';
import React from 'react';
import { PlayerResponse } from 'utils/interface';

import PlayerCard from './PlayerCard';

const PlayersList = ({ players }: { players: PlayerResponse[] }) => {
	return (
		<Box flex={1}>
			<FlatList
				data={players}
				ListEmptyComponent={
					<Text textAlign="center" mt="$6">
						No Players Listed
					</Text>
				}
				renderItem={({ item }) => <PlayerCard {...(item as PlayerResponse)} />}
				keyExtractor={(item: any) => item._id}
			/>
		</Box>
	);
};

export default PlayersList;
