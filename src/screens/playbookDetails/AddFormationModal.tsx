import {
	Button,
	ButtonGroup,
	ButtonText,
	CloseIcon,
	FormControl,
	Heading,
	Icon,
	Input,
	InputField,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@gluestack-ui/themed';
import React, { useCallback, useState } from 'react';

interface AddFormationModalProps {
	isOpen: boolean;
	handleSubmit: (name: string) => void;
	toggle: () => void;
}

const AddFormationModal = ({ isOpen, toggle, handleSubmit }: AddFormationModalProps) => {
	const [name, setName] = useState('');

	const onSubmit = useCallback(() => {
		handleSubmit(name);

		setName('');

		toggle();
	}, [handleSubmit, name, toggle]);

	return (
		<Modal isOpen={isOpen} onClose={toggle}>
			<ModalBackdrop />

			<ModalContent>
				<ModalHeader>
					<Heading>Add Formation</Heading>
					<ModalCloseButton onPress={toggle}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<FormControl mb="$8">
						<Input>
							<InputField
								value={name}
								onChangeText={setName}
								placeholder="Formation"
								type="text"
							/>
						</Input>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button>
							<ButtonText>Cancel</ButtonText>
						</Button>

						<Button onPress={onSubmit}>
							<ButtonText>Submit</ButtonText>
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddFormationModal;
