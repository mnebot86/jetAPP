import { Ionicons } from '@expo/vector-icons';
import { Box } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Chat, GameFilm, Playbook, Roster, Settings } from 'screens';

const Tab = createBottomTabNavigator();

type Navigation = any;

const MainStack = () => {
	const navigation: Navigation = useNavigation();

	const navigateToSettings = useCallback(() => {
		navigation.navigate('Settings');
	}, [navigation]);

	return (
		<Tab.Navigator
			screenOptions={{
				headerRight: () => (
					<Box mr="$8">
						<Ionicons
							name="settings"
							size={24}
							color="black"
							onPress={navigateToSettings}
						/>
					</Box>
				),
			}}>
			<Tab.Screen
				name="Roster"
				component={Roster}
				options={{
					tabBarIcon: () => <Ionicons name="people" size={24} color="black" />,
				}}
			/>

			<Tab.Screen
				name="Playbook"
				component={Playbook}
				options={{
					tabBarIcon: () => <Ionicons name="book" size={24} color="black" />,
				}}
			/>

			<Tab.Screen
				name="GameFilm"
				component={GameFilm}
				options={{
					tabBarIcon: () => <Ionicons name="film" size={24} color="black" />,
				}}
			/>

			<Tab.Screen
				name="Chat"
				component={Chat}
				options={{
					tabBarIcon: () => <Ionicons name="chatbox-ellipses" size={24} color="black" />,
				}}
			/>

			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{
					tabBarButton: () => null,
				}}
			/>
		</Tab.Navigator>
	);
};

export default MainStack;
