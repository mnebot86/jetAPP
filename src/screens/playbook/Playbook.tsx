import { Box, Text, VStack, set } from '@gluestack-ui/themed';
import { PlaybookResponse, createPlaybook, getPlaybooks } from 'network/playbook';
import { socket } from 'network/socket';
import React, { useCallback, useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import Header from './Header';
import AddPlaybookModal from './addPlaybookModal';

const Playbook = () => {
	const [playbooks, setPlaybooks] = useState<PlaybookResponse[] | []>([]);
	const [error, setError] = useState<string | null>(null);

	const [isOpen, setIsOpen] = useState(false);

	const toggleModel = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const handleSubmit = useCallback(async (name: string) => {
		if (!name.length) return;

		const data = {
			name,
		};

		try {
			const playbook = (await createPlaybook(data)) as PlaybookResponse;

			if (playbook.error) {
				setError(playbook.error);
			}
		} catch (error) {
			console.log('Error', error);
		}
	}, []);

	useEffect(() => {
		const fetchPlaybooks = async () => {
			try {
				const playbooks = await getPlaybooks();

				setPlaybooks(playbooks as PlaybookResponse[]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPlaybooks();
	}, []);

	useEffect(() => {
		socket.on('new_playbook', newPlaybook => {
			setPlaybooks(prev => [...prev, newPlaybook]);
		});

		return () => {
			socket.off('new_playbook');
		};
	}, []);

	return (
		<Box flex={1}>
			<Header toggle={toggleModel} />

			<VStack paddingHorizontal={10} space="xl">
				{playbooks.map((playbook, idx) => (
					<TouchableOpacity key={`${playbook.name}-${idx}`}>
						<Box
							bg="$darkBlue500"
							padding={20}
							borderColor="black"
							borderRadius={6}
							borderWidth={1}>
							<Text color="white">{playbook.name}</Text>
						</Box>
					</TouchableOpacity>
				))}
			</VStack>

			<AddPlaybookModal
				isOpen={isOpen}
				toggle={toggleModel}
				handleSubmit={handleSubmit}
				error={error}
			/>
		</Box>
	);
};

export default Playbook;
