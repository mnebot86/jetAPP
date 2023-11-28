import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GameFilm, GameFilmDetails } from 'screens';

const Stack = createStackNavigator();

interface GameFilmDetailsParams {
	id: string;
	team: string;
}

const GameFilmStack = () => {
	return (
		<Stack.Navigator initialRouteName="Roster">
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
