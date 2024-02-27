import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import { Chat, Settings } from 'screens';
import { getColorMode } from 'store/selectors/appState';
import { COLORS, themedStyle } from 'utils/styles';

import GameFilmStack from './GameFilmStack';
import PlaybookStack from './PlaybookStack';
import RosterStack from './RosterStack';

const Tab = createBottomTabNavigator();

const MainStack = () => {
	const colorMode = useSelector(getColorMode);

	return (
		<Tab.Navigator
			initialRouteName="GameFilm"
			screenOptions={{
				tabBarIconStyle: {
					marginTop: 8,
				},
				tabBarLabel: '',
				headerTintColor: themedStyle(colorMode, COLORS.darkenBlack, COLORS.white),
				headerStyle: {
					backgroundColor: themedStyle(colorMode, COLORS.darkenBlack, COLORS.white),
				},
				tabBarStyle: {
					backgroundColor: themedStyle(colorMode, COLORS.lightBlack, COLORS.white),
				},
				tabBarActiveTintColor: themedStyle(colorMode, COLORS.white, COLORS.baseBlack),
			}}>
			<Tab.Screen
				name="RosterStack"
				component={RosterStack}
				options={{
					title: 'Roster',
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="people"
							size={24}
							color={
								focused
									? themedStyle(colorMode, COLORS.white, COLORS.black) // light mode
									: themedStyle(colorMode, COLORS.gray, COLORS.gold) // dark mode
							}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="PlaybookStack"
				component={PlaybookStack}
				options={{
					title: 'Playbook',
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="book"
							size={24}
							color={
								focused
									? themedStyle(colorMode, COLORS.white, COLORS.black) // light mode
									: themedStyle(colorMode, COLORS.gray, COLORS.gold) // dark mode
							}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="GameFilmStack"
				component={GameFilmStack}
				options={{
					title: 'GameFilm',
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="film"
							size={24}
							color={
								focused
									? themedStyle(colorMode, COLORS.white, COLORS.black) // light mode
									: themedStyle(colorMode, COLORS.gray, COLORS.gold) // dark mode
							}
						/>
					),
					headerShown: false,
				}}
			/>

			<Tab.Screen
				name="Chat"
				component={Chat}
				options={{
					tabBarIcon: ({ focused }) => (
						<Ionicons
							name="chatbox-ellipses"
							size={24}
							color={
								focused
									? themedStyle(colorMode, COLORS.white, COLORS.black) // light mode
									: themedStyle(colorMode, COLORS.gray, COLORS.gold) // dark mode
							}
						/>
					),
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
