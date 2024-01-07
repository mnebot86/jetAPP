import {
	Box,
	Button,
	ButtonGroup,
	ButtonIcon,
	ButtonText,
	HStack,
	Image,
	Input,
	InputField,
	ScrollView,
	Spinner,
	Switch,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { Edit } from 'lucide-react-native';
import { getPlayer, updatePlayer } from 'network/player';
import React, { useCallback, useEffect, useState } from 'react';
import { PlayerResponse } from 'utils/interface';

interface PlayerEdit {
	_id?: string;
	firstName?: string;
	lastName?: string;
	avatar?: {
		url: string;
		imageId: string;
	};
	group?: string;
	isStriper?: boolean;
	positions?: string[];
	totalAbsent?: number;
	jerseyNumber?: number | null;
	allergies?: string[];
	medicalConditions?: string[];
	createdAt?: string;
	updateAt?: string;
	error?: string;
}

const PlayerDetails = () => {
	const router = useRoute();
	const playerId = (router.params as { _id: string })?._id;
	const [isLoading, setIsLoading] = useState(false);
	const [player, setPlayer] = useState<PlayerResponse | null>(null);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editPlayer, setEditPlayer] = useState<PlayerEdit>({ ...player });

	useEffect(() => {
		const fetchPlayer = async () => {
			setIsLoading(true);

			try {
				const player = (await getPlayer(playerId)) as PlayerResponse;

				if (player) {
					setPlayer(player);
				}
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlayer();
	}, [playerId]);

	const handleInputChange = (key: string, value: string) => {
		setEditPlayer({ ...editPlayer, [key]: value });
	};

	const handleOnSubmit = useCallback(async () => {
		setIsLoading(true);

		const positionsArray = editPlayer?.positions?.toString().split(',');
		const medicalArray = editPlayer?.medicalConditions?.toString().split(',');
		const allergiesArray = editPlayer?.allergies?.toString().split(',');

		const editPlayerData = {
			...editPlayer,
			totalAbsent: editPlayer.totalAbsent
				? parseInt(editPlayer.totalAbsent.toString(), 10)
				: 0,
			jerseyNumber: editPlayer.jerseyNumber
				? parseInt(editPlayer.jerseyNumber.toString(), 10)
				: null,
			positions: editPlayer.positions ? positionsArray : [],
			medicalConditions: editPlayer.medicalConditions ? medicalArray : [],
			allergies: editPlayer.allergies ? allergiesArray : [],
			isStriper: editPlayer.isStriper,
		};

		try {
			const updatedPlayer = (await updatePlayer(playerId, editPlayerData)) as PlayerResponse;

			setPlayer(updatedPlayer);
			setIsEditing(false);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, [editPlayer, playerId]);

	return (
		<>
			{isLoading ? (
				<Spinner flex={1} />
			) : (
				<ScrollView flex={1}>
					<Button
						mb="$4"
						w="95%"
						alignSelf="center"
						onPress={() => setIsEditing(!isEditing)}>
						<ButtonIcon as={Edit} />
					</Button>

					{player?.avatar ? (
						<Image
							w="$full"
							source={{ uri: player?.avatar.url }}
							alt="profile"
							h={350}
							role="img"
						/>
					) : null}

					<Box paddingHorizontal={20} pt="$4">
						<Text sub>Name:</Text>

						<HStack w="$full" justifyContent="space-between" mb="$4">
							<Input
								flex={1}
								variant="underlined"
								isReadOnly={!isEditing}
								isFocused={isEditing}>
								<InputField
									defaultValue={player?.firstName}
									onChangeText={event => handleInputChange('firstName', event)}
								/>
							</Input>

							<Input flex={1} variant="underlined" isReadOnly={!isEditing}>
								<InputField
									defaultValue={player?.lastName}
									onChangeText={event => handleInputChange('lastName', event)}
								/>
							</Input>
						</HStack>

						<VStack justifyContent="space-between" mb="$4">
							<Text sub>Jersey #:</Text>

							<Input flex={1} variant="underlined" isReadOnly={!isEditing}>
								<InputField
									defaultValue={
										player?.jerseyNumber
											? player?.jerseyNumber.toString()
											: 'N/A'
									}
									onChangeText={event => handleInputChange('jerseyNumber', event)}
								/>
							</Input>
						</VStack>

						<VStack mb={16}>
							<Text sub mb="$2">
								Absents:
							</Text>

							<Input variant="underlined" isReadOnly={!isEditing}>
								<InputField
									type="text"
									defaultValue={player?.totalAbsent.toString()}
									onChangeText={event => handleInputChange('totalAbsent', event)}
								/>
							</Input>
						</VStack>

						<VStack mb={16}>
							<Text sub mb="$2">
								Positions:
							</Text>

							<Input variant="underlined" isReadOnly={!isEditing}>
								<InputField
									type="text"
									defaultValue={player?.positions.map(pos => pos).join('')}
									onChangeText={event => handleInputChange('positions', event)}
								/>
							</Input>
						</VStack>

						<VStack mb={16}>
							<Text sub mb="$2">
								Medical:
							</Text>

							<Input variant="underlined" isReadOnly={!isEditing}>
								<InputField
									type="text"
									defaultValue={player?.medicalConditions
										.map(med => med)
										.join('')}
									onChangeText={event =>
										handleInputChange('medicalConditions', event)
									}
								/>
							</Input>
						</VStack>

						<VStack mb={16}>
							<Text sub mb="$2">
								Allergies:{' '}
							</Text>

							<Input variant="underlined" isReadOnly={!isEditing}>
								<InputField
									type="text"
									defaultValue={player?.allergies
										.map(allergy => allergy)
										.join('')}
									onChangeText={event => handleInputChange('allergies', event)}
								/>
							</Input>
						</VStack>

						<VStack>
							<Text sub mb="$2">
								Striper:
							</Text>

							{isEditing ? (
								<HStack space="md" alignItems="center" mb={16}>
									<Switch
										defaultValue={player?.isStriper}
										value={editPlayer?.isStriper}
										onToggle={isToggled =>
											setEditPlayer({ ...editPlayer, isStriper: isToggled })
										}
									/>
									<Text size="sm">{editPlayer?.isStriper ? 'Yes' : 'No'}</Text>
								</HStack>
							) : (
								<Text>{player?.isStriper ? 'Yes' : 'No'}</Text>
							)}
						</VStack>

						{isEditing ? (
							<ButtonGroup marginVertical="$8">
								<Button>
									<ButtonText>Cancel</ButtonText>
								</Button>

								<Button onPress={handleOnSubmit}>
									<ButtonText>Save</ButtonText>
								</Button>
							</ButtonGroup>
						) : null}
					</Box>
				</ScrollView>
			)}
		</>
	);
};

export default PlayerDetails;
