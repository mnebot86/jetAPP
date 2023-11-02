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
import React, { useCallback, useState } from 'react';
import { AvatarResponse } from 'utils/interface';

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

	const { firstName, lastName, medical, allergies } = formData;

	return (
		<Modal isOpen={isOpen} onClose={toggle} avoidKeyboard>
			<ModalBackdrop />
			<ModalContent>
				<ModalHeader>
					<Heading size="lg">Add New Player</Heading>

					<ModalCloseButton onPress={toggle}>
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
								id={`${formData.firstName}-${formData.lastName}`}
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
							<ButtonText>Cancel</ButtonText>
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
