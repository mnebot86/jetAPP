import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, MainStack } from 'navigation';
import { verifyUser } from 'network/auth';
import React, { useCallback, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native'; // Import AppState
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from 'store/selectors/user';
import { setUser, clearUser } from 'store/slices/user';
import { LoginResponse } from 'utils/interface';

const Main = () => {
	const dispatch = useDispatch();
	const isSignedIn = useSelector(getIsSignedIn);
	const verifyUserInterval = useRef<NodeJS.Timeout | null>(null);

	const fetchSession = useCallback(async () => {
		try {
			const user = (await verifyUser()) as LoginResponse;

			if (user.error) {
				dispatch(clearUser());
			} else {
				dispatch(setUser(user));
			}
		} catch (error) {
			console.error('Error fetching user session:', error);
		}
	}, [dispatch]);

	const scheduleRefresh = useCallback(() => {
		const interval = 60 * 60 * 1000;

		verifyUserInterval.current = setInterval(async () => {
			await fetchSession();
		}, interval);
	}, [fetchSession]);

	const handleAppStateChange = useCallback(
		async (newState: AppStateStatus) => {
			if (newState === 'active') {
				await fetchSession();
			}
		},
		[fetchSession]
	);

	useEffect(() => {
		const initSession = async () => {
			await fetchSession();
			scheduleRefresh();
		};

		initSession();

		AppState.addEventListener('change', handleAppStateChange);

		return () => {
			if (verifyUserInterval.current) {
				clearInterval(verifyUserInterval.current);
			}

			if ((AppState as any).removeEventListener) {
				(AppState as any).removeEventListener('change', handleAppStateChange);
			}
		};
	}, [dispatch, fetchSession, handleAppStateChange, scheduleRefresh]);

	return <NavigationContainer>{isSignedIn ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

export default Main;
