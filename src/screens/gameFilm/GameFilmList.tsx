import { Center, FlatList, Text } from '@gluestack-ui/themed';
import { GameFilmResponse } from 'network/gameFilm';
import React from 'react';
import { ListRenderItem } from 'react-native';
import { formattedDate } from 'utils/dateTime';

interface GameFilmListProps {
	gameFilms: GameFilmResponse[] | [];
}

const GameFilmList: React.FC<GameFilmListProps> = ({ gameFilms }) => {	
	const renderItem: ListRenderItem<GameFilmResponse> = ({ item }) => {
		return (
			<Center p="$8" borderBottomWidth={2} borderBottomColor="lightgray">
				<Text>{item.team}</Text>
				<Text>{formattedDate(item.date, false)}</Text>
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
