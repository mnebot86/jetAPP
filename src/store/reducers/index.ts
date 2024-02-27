import { combineReducers } from '@reduxjs/toolkit';

import appStateReducer from '../slices/appState';
import modalsStateReducer from '../slices/modals';

const rootReducer = combineReducers({
	appState: appStateReducer,
	modelsState: modalsStateReducer,
});

export default rootReducer;
