import { Box, Button, ButtonText, ButtonSpinner } from '@gluestack-ui/themed';
import { logout } from 'network/auth';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from 'store/slices/user';

const Settings = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const handleLogout = useCallback(async () => {
		setIsLoading(true);

		try {
			const res = await logout();

			if (res === 'OK') {
				dispatch(clearUser());
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, [dispatch]);

	return (
		<Box flex={1} justifyContent="center" alignItems="center">
			<Button variant="link" size="xl" onPress={handleLogout}>
				<ButtonText color="$red500">Log out</ButtonText>
				<ButtonSpinner animating={isLoading} ml={4} />
			</Button>
		</Box>
	);
};

export default Settings;
