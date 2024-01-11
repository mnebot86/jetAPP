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
import { ImagePickerButton, Cam } from 'components';
import Preview from 'components/Camera/Preview';
import { Camera, Edit } from 'lucide-react-native';
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
	const [image, setImage] = useState<string | null>(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isCameraOpen, setIsCameraOpen] = useState(false);

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

	const onCancel = useCallback(async () => {
		setIsEditing(false);

		setImage(null);

		setEditPlayer({ ...player });
	}, [player]);

	const toggleIsEditing = useCallback(() => {
		setIsEditing(!isEditing);
	}, [isEditing]);

	const togglePreviewOpen = useCallback(() => {
		setIsPreviewOpen(!isPreviewOpen);
	}, [isPreviewOpen]);

	const toggleCameraOpen = useCallback(() => {
		setIsCameraOpen(!isCameraOpen);
	}, [isCameraOpen]);

	const handleInputChange = (key: string, value: string) => {
		setEditPlayer({ ...editPlayer, [key]: value });
	};

	const handleOnSubmit = useCallback(async () => {
		setIsLoading(true);

		const editPlayerData = {
			...editPlayer,
		};

		const entries = Object.entries(editPlayerData);

		const formData = new FormData();

		// @ts-ignore
		entries.forEach(([key, value]) => formData.append(key, value));

		const type = image?.split('.')[1];

		if (image) {
			formData.append('avatar', {
				uri: image,
				name: `${editPlayer.firstName} ${editPlayer.lastName}`,
				type: `image/${type}`,
			} as any);

			formData.append('imageId', player?.avatar?.imageId || '');
		}

		try {
			const updatedPlayer = (await updatePlayer(playerId, formData)) as PlayerResponse;

			setPlayer(updatedPlayer);
			setIsEditing(false);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, [editPlayer, playerId, image, player]);

	return (
		<>
			{isLoading ? (
				<Spinner flex={1} />
			) : (
				<ScrollView flex={1}>
					<Button mb="$4" w="95%" alignSelf="center" onPress={toggleIsEditing}>
						<ButtonIcon as={Edit} />
					</Button>

					{player?.avatar ? (
						<Box>
							<Image
								w="$full"
								source={{ uri: image || player?.avatar.url }}
								alt="profile"
								h={350}
								role="img"
							/>

							{isEditing ? (
								<VStack mt="$4" paddingHorizontal={20}>
									<Text sub mb="$4">
										Edit Image:
									</Text>

									<ButtonGroup>
										<ImagePickerButton setImage={setImage} />

										<Button onPress={toggleCameraOpen}>
											<ButtonIcon as={Camera} />
										</Button>
									</ButtonGroup>
								</VStack>
							) : null}
						</Box>
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
									defaultValue={player?.totalAbsent?.toString()}
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
									defaultValue={player?.positions.map(pos => pos).join(' ')}
									placeholder={isEditing ? 'Comma separated ex QB, RB, WR' : ''}
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
									placeholder={
										isEditing ? 'Comma separated ex Asthma, Migraines' : ''
									}
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
									placeholder={
										isEditing ? 'Comma separated ex Tree nuts, Gluten' : ''
									}
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
								<Button onPress={onCancel}>
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

			{isCameraOpen ? (
				<Cam
					onClose={toggleCameraOpen}
					setProfileImage={setImage}
					togglePreviewOpen={togglePreviewOpen}
				/>
			) : null}

			{isPreviewOpen ? (
				<Preview
					profileImage={image}
					togglePreviewOpen={togglePreviewOpen}
					toggleCameraOpen={toggleCameraOpen}
				/>
			) : null}
		</>
	);
};

export default PlayerDetails;
