import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Roster, PlayerDetails } from 'screens';

const Stack = createStackNavigator();

const RosterStack = () => {
	return (
		<Stack.Navigator initialRouteName="Roster">
			<Stack.Screen name="Roster" component={Roster} />

			<Stack.Screen name="PlayerDetails" component={PlayerDetails} />
		</Stack.Navigator>
	);
};

export default RosterStack;
