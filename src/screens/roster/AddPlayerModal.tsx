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
	ButtonIcon,
	ButtonGroup,
	ButtonText,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Input,
	InputField,
	Image as Img,
	Center,
} from '@gluestack-ui/themed';
import { AvatarUploadButton } from 'components';
import PlaceHolder from 'images/placeholders/person.png';
import { Camera } from 'lucide-react-native';
import { deleteAvatar } from 'network/avatar';
import React, { useCallback, useState, useMemo } from 'react';
import { AvatarResponse } from 'utils/interface';

/**
 * TODO: Error Messaging
 * TODO: Generate a new id when modal opens and on save to player
 * TODO: On Submit - clear form, avatar and success message
 * TODO: Update player list
 * TODO: Disable Avatar button unless name fields are filled
 */

interface AddPlayerModalProps {
	isOpen: boolean;
	toggle: () => void;
}

const AddPlayerModal = ({ isOpen, toggle }: AddPlayerModalProps) => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [avatar, setAvatar] = useState<AvatarResponse | null>(null);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		medical: '',
		allergies: '',
	});

	const handleInputChange = useCallback(
		(fieldName: string, value: string) => {
			setFormData({ ...formData, [fieldName]: value });
		},
		[formData]
	);

	const onCancel = useCallback(async () => {
		console.log(avatar);
		if (avatar) {
			try {
				const deletedAvatar = await deleteAvatar(avatar.imageId);
				console.log(deletedAvatar);
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

		toggle();
	}, [avatar, toggle]);

	const { firstName, lastName, medical, allergies } = formData;

	const imageUniqueId: string | null = useMemo(() => {
		if (!firstName || !lastName) return null;

		return `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
	}, [firstName, lastName]);

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
						<Img
							source={profileImage ? profileImage : PlaceHolder}
							size="xl"
							alt="profile"
							borderRadius={100}
							borderWidth={profileImage ? 4 : 0}
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
							/>
						</Input>
					</FormControl>

					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">Upload Image</FormControlLabelText>
						</FormControlLabel>

						<ButtonGroup>
							<AvatarUploadButton
								id={imageUniqueId}
								setProfileImage={setProfileImage}
								profileImage={profileImage}
								setAvatar={setAvatar}
							/>

							<Button>
								<ButtonIcon as={Camera} />
							</Button>
						</ButtonGroup>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button variant="outline" onPress={toggle}>
							<ButtonText onPress={onCancel}>Cancel</ButtonText>
						</Button>

						<Button>
							<ButtonText>Submit</ButtonText>
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddPlayerModal;
