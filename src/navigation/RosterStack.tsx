import { Ionicons } from '@expo/vector-icons';
import { Box } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { PlayerDetails, Roster } from 'screens';

const Stack = createStackNavigator();

type Params = {
	name: string;
};

type Navigation = any;

const RosterStack = () => {
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
			<Stack.Screen name="Roster" component={Roster} />

			<Stack.Screen
				name="PlayerDetails"
				component={PlayerDetails}
				options={({ route }) => ({
					title: (route.params as Params)?.name,
				})}
			/>
		</Stack.Navigator>
	);
};

export default RosterStack;
