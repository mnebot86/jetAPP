import { Icon } from '@gluestack-ui/themed';
import { createStackNavigator } from '@react-navigation/stack';
import { Upload } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GameFilm, GameFilmDetails } from 'screens';
import { getColorMode } from 'store/selectors/appState';
import { toggleIsGameFilmVideoUploadOpen } from 'store/slices/modals';
import { COLORS, themedStyle } from 'utils/styles';

const Stack = createStackNavigator();

const GameFilmStack = () => {
	const dispatch = useDispatch();

	const colorMode = useSelector(getColorMode);

	return (
		<Stack.Navigator
			initialRouteName="GameFilm"
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: themedStyle(colorMode, COLORS.white, COLORS.baseBlack),
				headerTitleStyle: {
					color: themedStyle(colorMode, COLORS.white, COLORS.baseBlack),
				},
				headerStyle: {
					backgroundColor: themedStyle(colorMode, COLORS.darkenBlack, COLORS.white),
				},
			}}>
			<Stack.Screen name="GameFilm" component={GameFilm} options={{ title: 'Game Weeks' }} />

			<Stack.Screen
				name="GameFilmDetails"
				component={GameFilmDetails}
				options={{
					headerTitle: '',
					headerRight: () => (
						<TouchableOpacity
							onPress={() => dispatch(toggleIsGameFilmVideoUploadOpen())}>
							<Icon
								as={Upload}
								size="lg"
								pr="$10"
								color={COLORS.black}
								sx={{ _dark: { color: COLORS.white } }}
							/>
						</TouchableOpacity>
					),
				}}
			/>
		</Stack.Navigator>
	);
};

export default GameFilmStack;
