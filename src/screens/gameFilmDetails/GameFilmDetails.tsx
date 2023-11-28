import { Box, Text } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import AddGameFilmModal from './AddGameFilmModal';
import Header from './Header';

const GameFilmDetails = () => {
	const router = useRoute();
	const playbookId = (router.params as { id: string })?.id;
	const team = (router.params as { team: string })?.team;

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleIsModalOpen = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	return (
		<Box flex={1}>
			<Header toggle={toggleIsModalOpen} />
			<Text>GameFilmDetails</Text>

			<AddGameFilmModal
				isOpen={isModalOpen}
				toggle={toggleIsModalOpen}
				playbookId={playbookId}
				team={team}
			/>
		</Box>
	);
};

export default GameFilmDetails;
