import { Box, Text } from '@gluestack-ui/themed';
import React, { useCallback, useState } from 'react';

import AddPlayerModal from './AddPlayerModal';
import ControlsHeader from './ControlsHeader';

const Roster = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	return (
		<Box flex={1}>
			<ControlsHeader toggle={toggleModal} />

			<Text alignSelf="center">Roster</Text>
			<AddPlayerModal isOpen={isModalOpen} toggle={toggleModal} />
		</Box>
	);
};

export default Roster;
