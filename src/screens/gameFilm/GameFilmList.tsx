import { HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { MoveRight } from 'lucide-react-native';
import { GameFilmResponse } from 'network/gameFilm';
import React from 'react';
import { FlatList, ListRenderItem, TouchableOpacity } from 'react-native';

interface GameFilmListProps {
	gameFilms: GameFilmResponse[] | [];
}

type Navigation = any;

const GameFilmList: React.FC<GameFilmListProps> = ({ gameFilms }) => {
	const navigation: Navigation = useNavigation();

	const renderItem: ListRenderItem<GameFilmResponse> = ({ item, index }) => {
		return (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('GameFilmDetails', {
						id: item._id,
						team: item.team,
					})
				}>
				<HStack p={14} justifyContent="space-between" alignItems="center">
					<VStack>
						<Text bold>{`Week ${index + 1}`}</Text>
						<Text size="sm" color="#A1824A" sx={{ color: '#9E9EB8' }}>
							{item.team}
						</Text>
					</VStack>

					<Icon as={MoveRight} color="#1C170D" sx={{ _dark: { color: '#FFF' } }} />
				</HStack>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList<GameFilmResponse>
			data={gameFilms}
			renderItem={renderItem}
			ListHeaderComponent={
				<Text
					textAlign="center"
					mt="$4"
					bold
					color="#A1824A"
					sx={{ _dark: { color: '#9E9EB8' } }}>
					Select a week
				</Text>
			}
			keyExtractor={(item: GameFilmResponse) => item._id}
		/>
	);
};

export default GameFilmList;
