import { NavigationContainer } from '@react-navigation/native';
import { AuthStack, MainStack } from 'navigation';
import { verifyUser } from 'network/auth';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsSignedIn } from 'store/selectors/user';

const Main = () => {
	const isSignedIn = useSelector(getIsSignedIn);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const res = await verifyUser();

				if (typeof res === 'string') {
					//TODO dispatch clear user
				} else {
					//TODO: dispatch set user
				}

				console.log('RES', res);
			} catch (error) {
				throw error;
			}
		};

		fetchSession();
	}, []);

	return <NavigationContainer>{isSignedIn ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

export default Main;
