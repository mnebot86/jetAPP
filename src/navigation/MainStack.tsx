import { Ionicons } from '@expo/vector-icons';
import { Box } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import RosterStack from 'navigation/RosterStack';
import React, { useCallback } from 'react';
import { Chat, GameFilm, Playbook, Settings } from 'screens';

const Tab = createBottomTabNavigator();

type Navigation = any;

const MainStack = () => {
	const navigation: Navigation = useNavigation();

	const navigateToSettings = useCallback(() => {
		navigation.navigate('Settings');
	}, [navigation]);

	return (
		<Tab.Navigator
			initialRouteName="GameFilm"
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
			<Tab.Screen
				name="RosterStack"
				component={RosterStack}
				options={{
					title: 'Roster',
					tabBarIcon: () => <Ionicons name="people" size={24} color="black" />,
					headerShown: false,
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
