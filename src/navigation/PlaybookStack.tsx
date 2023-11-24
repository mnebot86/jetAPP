import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Playbook, PlaybookDetails } from 'screens';

const Stack = createStackNavigator();

interface PlaybookDetailsParams {
	id: string;
	name: string;
}

const PlaybookStack = () => {
	return (
		<Stack.Navigator initialRouteName="Playbook">
			<Stack.Screen name="Playbook" component={Playbook} />

			<Stack.Screen
				name="PlaybookDetails"
				component={PlaybookDetails}
				options={({ route }) => ({
					title: (route.params as PlaybookDetailsParams)?.name,
				})}
			/>
		</Stack.Navigator>
	);
};

export default PlaybookStack;
