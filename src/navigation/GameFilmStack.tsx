import { Ionicons } from '@expo/vector-icons';
import { Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { GameFilm, GameFilmDetails } from 'screens';

const Stack = createStackNavigator();

interface GameFilmDetailsParams {
	id: string;
	team: string;
}

type Navigation = any;

const GameFilmStack = () => {
	const navigation: Navigation = useNavigation();

	const navigateToSettings = useCallback(() => {
		navigation.navigate('Settings');
	}, [navigation]);

	return (
		<Stack.Navigator
			initialRouteName="Roster"
			screenOptions={{
				headerRight: () => (
					<Box mr="$4">
						<Ionicons
							name="settings"
							size={24}
							color="black"
							onPress={navigateToSettings}
						/>
					</Box>
				),
			}}>
			<Stack.Screen name="GameFilm" component={GameFilm} />

			<Stack.Screen
				name="GameFilmDetails"
				component={GameFilmDetails}
				options={({ route }) => ({
					title: (route.params as GameFilmDetailsParams)?.team,
				})}
			/>
		</Stack.Navigator>
	);
};

export default GameFilmStack;
