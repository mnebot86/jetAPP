import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, MainStack } from 'navigation';
import { verifyUser } from 'network/auth';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from 'store/selectors/user';
import { setUser, clearUser } from 'store/slices/user';
import { LoginResponse } from 'utils/interface';

const Main = () => {
	const dispatch = useDispatch();
	const isSignedIn = useSelector(getIsSignedIn);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const user = (await verifyUser()) as LoginResponse;

				if (user.error) {
					dispatch(clearUser());
				} else {
					dispatch(setUser(user));
				}
			} catch (error) {
				throw error;
			}
		};

		fetchSession();
	}, [dispatch]);

	return <NavigationContainer>{isSignedIn ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

export default Main;
