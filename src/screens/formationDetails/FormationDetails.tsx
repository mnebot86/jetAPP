import { Box, Spinner } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { getFormation, PlayData } from 'network/formation';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useState } from 'react';

import AddPlayModal from './AddPlaysModal';
import FormationPlaysList from './FormationPlaysList';
import Header from './Header';

const FormationDetails = () => {
	const route = useRoute();

	const [isLoading, setIsLoading] = useState(false);
	const [plays, setPlays] = useState<PlayData[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const playbookId = (route.params as { playbookId: string })?.playbookId;
	const formationId = (route.params as { formationId: string })?.formationId;

	const toggleIsModalOpen = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	useEffect(() => {
		const fetchFormation = async () => {
			setIsLoading(true);

			try {
				const res = await getFormation(playbookId, formationId);

				setPlays(res.plays);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFormation();
	}, [playbookId, formationId]);

	useEffect(() => {
		socket.on('new_play', newPlay => {
			setPlays(prev => [...prev, newPlay]);
		});

		return () => {
			socket.off('new_play');
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<Spinner flex={1} animating />
			) : (
				<Box>
					<Header toggle={toggleIsModalOpen} />

					<FormationPlaysList plays={plays} />

					<AddPlayModal
						isOpen={isModalOpen}
						toggle={toggleIsModalOpen}
						playbookId={playbookId}
						formationId={formationId}
					/>
				</Box>
			)}
		</>
	);
};

export default FormationDetails;
