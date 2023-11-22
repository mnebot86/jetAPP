import { Box, Text } from '@gluestack-ui/themed';
import { getPlayers } from 'network/player';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useState } from 'react';
import { PlayerResponse } from 'utils/interface';

import AddPlayerModal from './AddPlayerModal';
import ControlsHeader from './ControlsHeader';
import PlayersList from './PlayersList';

const Roster = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [players, setPlayers] = useState<PlayerResponse[]>([]);

	const toggleModal = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	useEffect(() => {
		const fetchPlayers = async () => {
			setIsLoading(true);

			try {
				const res = await getPlayers();
				setPlayers(res as PlayerResponse[]);
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlayers();
	}, []);

	useEffect(() => {
		socket.on('new_player', newPlayer => {
			setPlayers(prevPlayers => {
				const updatedPlayers = [...prevPlayers, newPlayer];

				updatedPlayers.sort((a, b) => a.lastName.localeCompare(b.lastName));

				return updatedPlayers;
			});
		});

		return () => {
			socket.off('new_player');
		};
	}, []);

	return (
		<Box flex={1}>
			<ControlsHeader toggle={toggleModal} />

			<PlayersList players={players} />

			<AddPlayerModal isOpen={isModalOpen} toggle={toggleModal} />
		</Box>
	);
};

export default Roster;
