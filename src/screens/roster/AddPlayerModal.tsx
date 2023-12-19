import {
	Modal,
	ModalBackdrop,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
	ModalFooter,
	ModalContent,
	Heading,
	Icon,
	CloseIcon,
	Button,
	ButtonGroup,
	ButtonText,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Input,
	InputField,
	Image,
	Center,
	ButtonSpinner,
	FormControlErrorIcon,
	FormControlError,
	FormControlErrorText,
} from '@gluestack-ui/themed';
import { AvatarUploadButton, Cam } from 'components';
import Preview from 'components/Camera/Preview';
import { PlaceHolder } from 'images/placeholders';
import { AlertCircleIcon  } from 'lucide-react-native';
import { deleteAvatar } from 'network/avatar';
import { createPlayer } from 'network/player';
import React, { useCallback, useState, useMemo } from 'react';
import { AvatarResponse, PlayerResponse } from 'utils/interface';

interface AddPlayerModalProps {
	isOpen: boolean;
	toggle: () => void;
}

interface PlayerData {
	avatar: AvatarResponse;
	firstName: string;
	lastName: string;
	medicalCondition: string[] | [];
	allergies: string[] | [];
}

const AddPlayerModal = ({ isOpen, toggle }: AddPlayerModalProps) => {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setLoading] = useState(false);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [avatar, setAvatar] = useState<AvatarResponse | null>(null);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		medical: '',
		allergies: '',
	});

	const { firstName, lastName, medical, allergies } = formData;

	const togglePreviewOpen = useCallback(() => {
		setIsPreviewOpen(!isPreviewOpen);
	}, [isPreviewOpen]);

	const toggleCameraOpen = useCallback(() => {
		setIsCameraOpen(!isCameraOpen);
	}, [isCameraOpen]);

	const handleInputChange = useCallback(
		(fieldName: string, value: string) => {
			setFormData({ ...formData, [fieldName]: value });
		},
		[formData]
	);

	const handleSubmit = useCallback(async () => {
		setLoading(true);

		const data = {
			avatar,
			firstName,
			lastName,
			medicalCondition: medical ? medical.split(', ') : [],
			allergies: allergies ? allergies.split(', ') : [],
		} as PlayerData;

		try {
			const player = (await createPlayer(data)) as PlayerResponse;

			if (player.error) {
				setError(player.error);

				if (avatar) {
					try {
						await deleteAvatar(avatar.imageId);
					} catch (error) {
						throw error;
					}
				}
			} else {
				toggle();
			}
		} catch (error) {
			setError(error as any);

			throw error;
		} finally {
			setLoading(false);

			setAvatar(null);

			setFormData({
				firstName: '',
				lastName: '',
				medical: '',
				allergies: '',
			});

			setProfileImage(null);

			setError(null);
		}
	}, [allergies, avatar, firstName, lastName, medical, toggle]);

	const onCancel = useCallback(async () => {
		if (avatar) {
			try {
				await deleteAvatar(avatar.imageId);
			} catch (error) {
				throw error;
			}
		}

		setAvatar(null);

		setFormData({
			firstName: '',
			lastName: '',
			medical: '',
			allergies: '',
		});

		setProfileImage(null);

		setError(null);

		toggle();
	}, [avatar, toggle]);

	const isDisabled = useMemo(() => {
		return !firstName || !lastName || !avatar;
	}, [firstName, lastName, avatar]);

	return (
		<Modal isOpen={isOpen} onClose={onCancel} avoidKeyboard>
			<ModalBackdrop />
			<ModalContent>
				<ModalHeader>
					<Heading size="lg">Add New Player</Heading>

					<ModalCloseButton onPress={onCancel}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<Center mb={16}>
						<Image
							source={profileImage ? profileImage : PlaceHolder}
							size="xl"
							alt="profile"
							borderRadius={100}
							borderWidth={profileImage ? 4 : 0}
							role="img"
						/>
					</Center>

					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">First Name</FormControlLabelText>
						</FormControlLabel>

						<Input flex={1}>
							<InputField
								value={firstName}
								onChangeText={text => handleInputChange('firstName', text)}
							/>
						</Input>
					</FormControl>

					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">Last Name</FormControlLabelText>
						</FormControlLabel>

						<Input flex={1}>
							<InputField
								value={lastName}
								onChangeText={text => handleInputChange('lastName', text)}
							/>
						</Input>
					</FormControl>

					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">Medical</FormControlLabelText>
						</FormControlLabel>

						<Input flex={1}>
							<InputField
								value={medical}
								onChangeText={text => handleInputChange('medical', text)}
								placeholder="comma separate, asthma, etc"
							/>
						</Input>
					</FormControl>

					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">Allergies</FormControlLabelText>
						</FormControlLabel>

						<Input flex={1}>
							<InputField
								value={allergies}
								onChangeText={text => handleInputChange('allergies', text)}
								placeholder="comma separate, tree nuts, etc"
							/>
						</Input>
					</FormControl>

					<FormControl mb="$4" isInvalid={!!error}>
						<FormControlLabel>
							<FormControlLabelText mr="$3">Upload Image</FormControlLabelText>
						</FormControlLabel>

						<ButtonGroup>
							<AvatarUploadButton
								setProfileImage={setProfileImage}
								profileImage={profileImage}
								setAvatar={setAvatar}
							/>

							<Button onPress={toggleCameraOpen}>
								<ButtonText>Cam</ButtonText>
							</Button>
						</ButtonGroup>

						<FormControlError mt="$3">
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText>{error}</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button variant="outline" onPress={toggle}>
							<ButtonText onPress={onCancel}>Cancel</ButtonText>
						</Button>

						<Button onPress={handleSubmit} disabled={isDisabled}>
							{isLoading ? (
								<ButtonSpinner animating />
							) : (
								<ButtonText>Submit</ButtonText>
							)}
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>

			{isCameraOpen ? (
				<Cam
					onClose={toggleCameraOpen}
					setProfileImage={setProfileImage}
					togglePreviewOpen={togglePreviewOpen}
				/>
			) : null}

			{isPreviewOpen ? (
				<Preview
					profileImage={profileImage}
					togglePreviewOpen={togglePreviewOpen}
					toggleCameraOpen={toggleCameraOpen}
				/>
			) : null}
		</Modal>
	);
};

export default AddPlayerModal;
