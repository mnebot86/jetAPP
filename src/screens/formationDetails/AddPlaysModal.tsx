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
	ButtonSpinner,
	FormControlErrorIcon,
	FormControlError,
	FormControlErrorText,
	Textarea,
	TextareaInput,
} from '@gluestack-ui/themed';
import { ImagePickerButton } from 'components';
import { get } from 'lodash';
import { AlertCircleIcon } from 'lucide-react-native';
import { createPlay } from 'network/plays';
import React, { useCallback, useState } from 'react';

type AddPlaysModalProps = {
	isOpen: boolean;
	toggle: () => void;
	playbookId: string;
	formationId: string;
};

const AddPlayModal = ({ isOpen, toggle, playbookId, formationId }: AddPlaysModalProps) => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState<string | null>(null);

	const onClose = useCallback(() => {
		setError(null);
		setName('');
		setDescription('');
		setImage(null);

		toggle();
	}, [toggle]);

	const handleSubmit = useCallback(async () => {
		setIsLoading(true);

		const formData = new FormData();
		const type = image?.split('.')[1];

		formData.append('play_image', {
			uri: image,
			name,
			type: `image/${type}`,
		} as any);

		formData.append('name', name);
		formData.append('description', description);

		try {
			const play = await createPlay(formData, playbookId, formationId);

			if (play) onClose();
		} catch (error) {
			console.error('Error', error);

			const errorMessage = get(error, 'response.data.error', null);

			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	}, [description, formationId, image, name, playbookId, onClose]);

	return (
		<Modal isOpen={isOpen} avoidKeyboard>
			<ModalBackdrop />

			<ModalContent>
				<ModalHeader>
					<Heading size="lg">Add New Play</Heading>

					<ModalCloseButton onPress={onClose}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">Name</FormControlLabelText>
						</FormControlLabel>

						<Input flex={1}>
							<InputField
								value={name}
								onChangeText={setName}
								type="text"
								role="dialog"
							/>
						</Input>
					</FormControl>

					<FormControl mb="$4">
						<FormControlLabel>
							<FormControlLabelText mr="$3">Description</FormControlLabelText>
						</FormControlLabel>

						<Textarea>
							<TextareaInput onChangeText={setDescription} />
						</Textarea>
					</FormControl>

					<FormControl mb="$4" isInvalid={!!error}>
						<FormControlLabel>
							<FormControlLabelText mr="$3">Upload Image</FormControlLabelText>
						</FormControlLabel>

						<ButtonGroup>
							<ImagePickerButton setImage={setImage} />
						</ButtonGroup>

						{image ? (
							<Image
								mt="$3"
								source={{ uri: image }}
								w={400}
								resizeMode="contain"
								alt="plays"
								role="img"
							/>
						) : null}

						<FormControlError mt="$3">
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText>{error}</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button variant="outline" onPress={onClose}>
							<ButtonText>Cancel</ButtonText>
						</Button>

						<Button>
							{isLoading ? (
								<ButtonSpinner animating />
							) : (
								<ButtonText onPress={handleSubmit}>Submit</ButtonText>
							)}
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddPlayModal;
