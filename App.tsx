import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';

import Main from './Main';

const App = () => {
	return (
		<GluestackUIProvider config={config}>
			<Provider store={store}>
				<Main />
			</Provider>
		</GluestackUIProvider>
	);
};

export default App;
