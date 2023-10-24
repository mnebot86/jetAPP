import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login } from 'screens';

const Stack = createStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="LoginScreen"
			screenOptions={{
				headerBackTitleVisible: false,
			}}>
			<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

export default AuthStack;
