import { Box, Text } from '@gluestack-ui/themed';
import { verifyUser } from 'network/auth';
import React, { useEffect } from 'react';

const Main = () => {
	useEffect(() => {
		const fetchSession = async () => {
			try {
				const res = await verifyUser();
				console.log('RES', res);
			} catch (error) {
				console.log('Error' + error);
			}
		};

		fetchSession();
	}, []);

	return (
		<Box width="100%" height="100%" justifyContent="center" alignItems="center">
			<Text>Main is render</Text>
		</Box>
	);
};

export default Main;
