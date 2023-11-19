import { Center, FlatList, Text } from '@gluestack-ui/themed';
import { GameFilmResponse } from 'network/gameFilm';
import React from 'react';
import { ListRenderItem } from 'react-native';

interface GameFilmListProps {
	gameFilms: GameFilmResponse[] | [];
}

const GameFilmList: React.FC<GameFilmListProps> = ({ gameFilms }) => {
	const renderItem: ListRenderItem<GameFilmResponse> = ({ item }) => {
		const formattedDate = new Date(item.date).toLocaleString('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			timeZone: 'UTC',
		});

		return (
			<Center p="$8" borderBottomWidth={2} borderBottomColor="lightgray">
				<Text>{item.team}</Text>
				<Text>{formattedDate}</Text>
			</Center>
		);
	};

	if (!gameFilms.length) {
		return (
			<Center>
				<Text>No GameFilms</Text>
			</Center>
		);
	}

	return (
		// @ts-ignore
		<FlatList<GameFilmResponse>
			data={gameFilms}
			renderItem={renderItem}
			keyExtractor={(item: GameFilmResponse) => item._id}
		/>
	);
};

export default GameFilmList;
