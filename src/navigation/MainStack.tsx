import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Roster, Playbook, GameFilm, Chat } from 'screens';

const Tab = createBottomTabNavigator();

const MainStack = () => {
	return (
		<Tab.Navigator>
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
		</Tab.Navigator>
	);
};

export default MainStack;
