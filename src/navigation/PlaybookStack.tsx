import { Ionicons } from '@expo/vector-icons';
import { Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback } from 'react';
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

type Navigation = any;

const PlaybookStack = () => {
	const navigation: Navigation = useNavigation();

	const navigateToSettings = useCallback(() => {
		navigation.navigate('Settings');
	}, [navigation]);

	return (
		<Stack.Navigator
			initialRouteName="Playbook"
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
