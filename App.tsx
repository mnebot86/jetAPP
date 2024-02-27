import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import store from 'store';

import Main from './Main';

const App = () => {
	const colorTheme = useColorScheme() || 'light';

	return (
		<GluestackUIProvider config={config} colorMode="dark">
			<Provider store={store}>
				<Main colorTheme={colorTheme} />
			</Provider>
		</GluestackUIProvider>
	);
};

export default App;
