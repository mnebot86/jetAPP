import { Box } from '@gluestack-ui/themed';
import { GameFilmResponse, createGameFilm, getGameFilms } from 'network/gameFilm';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useState } from 'react';

import AddGameFilmModal from './AddGameFilmModal';
import GameFilmList from './GameFilmList';
import Header from './Header';

const GameFilm = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [gameFilms, setGameFilms] = useState<GameFilmResponse[] | []>([]);

	const toggleModal = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	const handleSubmit = useCallback(
		async (name: string, date: string) => {
			const data = {
				team: name,
				date,
			};

			try {
				const res = (await createGameFilm(data)) as GameFilmResponse;

				if (res.error) {
					setError(res.error);
					return;
				}

				toggleModal();
			} catch (error) {
				throw error;
			}
		},
		[toggleModal]
	);

	useEffect(() => {
		const fetchGameFilms = async () => {
			const res = (await getGameFilms()) as GameFilmResponse[];

			if (res) {
				setGameFilms(res);
			}
		};

		fetchGameFilms();
	}, []);

	useEffect(() => {
		socket.on('new_gameFilm', newGameFilm => {
			setGameFilms(prev => [...prev, newGameFilm]);
		});

		return () => {
			socket.off('new_playbook');
		};
	}, []);

	return (
		<Box flex={1}>
			<Header toggle={toggleModal} />

			<GameFilmList gameFilms={gameFilms} />

			<AddGameFilmModal
				handleSubmit={handleSubmit}
				error={error}
				isModalOpen={isModalOpen}
				toggle={toggleModal}
			/>
		</Box>
	);
};

export default GameFilm;
