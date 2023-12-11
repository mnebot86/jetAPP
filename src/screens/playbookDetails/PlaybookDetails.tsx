import { Box, Spinner, Text, Center } from '@gluestack-ui/themed';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FormationResponse, createFormation } from 'network/formation';
import { PlaybookResponse, getPlaybook } from 'network/playbook';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import AddFormationModal from './AddFormationModal';
import Header from './Header';

type Navigation = any;

const PlaybookDetails = () => {
	const router = useRoute();
	const navigation: Navigation = useNavigation();

	const [isLoading, setIsLoading] = useState(false);
	const [formations, setFormation] = useState<FormationResponse[] | string[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const playbookId = (router.params as { id: string })?.id;

	const renderItem = ({ item }: { item: FormationResponse }) => {
		const handleNavigation = () => {
			navigation.navigate('FormationDetails', {
				formationId: item._id,
				name: item.name,
				playbookId,
			});
		};

		return (
			<TouchableOpacity onPress={handleNavigation}>
				<Center p="$8" borderBottomWidth={2} borderBottomColor="lightgray">
					<Text>{item.name}</Text>
				</Center>
			</TouchableOpacity>
		);
	};

	const toggleIsModalOpen = useCallback(() => {
		setIsModalOpen(!isModalOpen);
	}, [isModalOpen]);

	const handleSubmit = useCallback(
		async (name: string) => {
			setIsLoading(true);

			const data = { name };

			const playbookId = (router.params as { id: string })?.id;

			try {
				const res = (await createFormation(data, playbookId)) as FormationResponse;

				if (res.error) {
					throw res.error;
				}
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		},
		[router]
	);

	useEffect(() => {
		const fetchPlaybook = async () => {
			setIsLoading(true);

			try {
				const res = (await getPlaybook(
					(router.params as { id: string })?.id
				)) as PlaybookResponse;

				if (res) {
					setFormation(res.formations);
				}
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlaybook();
	}, [router]);

	useEffect(() => {
		socket.on('new_formation', newFormation => {
			setFormation(prev => [...prev, newFormation]);
		});

		return () => {
			socket.off('new_playbook');
		};
	}, []);

	const _formations: FormationResponse[] = (formations || []) as FormationResponse[];

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<Box flex={1}>
					<Header toggle={toggleIsModalOpen} />

					<FlatList
						data={_formations}
						ListEmptyComponent={
							<Text textAlign="center" mt="$6">
								Add a new Formation
							</Text>
						}
						renderItem={renderItem}
						keyExtractor={(item: FormationResponse) => item._id}
					/>

					<AddFormationModal
						isOpen={isModalOpen}
						toggle={toggleIsModalOpen}
						handleSubmit={handleSubmit}
					/>
				</Box>
			)}
		</>
	);
};

export default PlaybookDetails;
