import { Center, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { GameFilmResponse } from 'network/gameFilm';
import React from 'react';
import { ListRenderItem, FlatList, TouchableOpacity } from 'react-native';
import { formattedDate } from 'utils/dateTime';

interface GameFilmListProps {
	gameFilms: GameFilmResponse[] | [];
}

type Navigation = any;

const GameFilmList: React.FC<GameFilmListProps> = ({ gameFilms }) => {
	const navigation: Navigation = useNavigation();

	const renderItem: ListRenderItem<GameFilmResponse> = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('GameFilmDetails', {
						id: item._id,
						team: item.team,
					})
				}>
				<Center p="$8" borderBottomWidth={2} borderBottomColor="lightgray">
					<Text>{item.team}</Text>
					<Text>{formattedDate(item.date, false)}</Text>
				</Center>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList<GameFilmResponse>
			data={gameFilms}
			renderItem={renderItem}
			ListEmptyComponent={
				<Center>
					<Text>No GameFilms</Text>
				</Center>
			}
			keyExtractor={(item: GameFilmResponse) => item._id}
		/>
	);
};

export default GameFilmList;
