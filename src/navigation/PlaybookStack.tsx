import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FormationDetails, Playbook, PlaybookDetails, PlayDetails } from 'screens';

const Stack = createStackNavigator();

type Params = {
	id: string;
	name: string;
};

type PlayParams = {
	name: string;
	image: string;
	description: string;
};

const PlaybookStack = () => {
	return (
		<Stack.Navigator initialRouteName="Playbook">
			<Stack.Screen name="Playbook" component={Playbook} />

			<Stack.Screen
				name="PlaybookDetails"
				component={PlaybookDetails}
				options={({ route }) => ({
					title: (route.params as Params)?.name,
				})}
			/>

			<Stack.Screen
				name="FormationDetails"
				component={FormationDetails}
				options={({ route }) => ({
					title: (route.params as Params)?.name,
				})}
			/>

			<Stack.Screen
				name="PlayDetails"
				component={PlayDetails}
				options={({ route }) => ({
					title: (route.params as PlayParams)?.name,
				})}
			/>
		</Stack.Navigator>
	);
};

export default PlaybookStack;
