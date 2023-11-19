import {
	Button,
	ButtonGroup,
	ButtonText,
	CloseIcon,
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
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
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { AlertCircleIcon } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';

interface AddGameFilmModalProps {
	handleSubmit: (name: string, date: string) => void;
	error: string | null;
	isModalOpen: boolean;
	toggle: () => void;
}

const AddGameFilmModal = ({ handleSubmit, error, toggle, isModalOpen }: AddGameFilmModalProps) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState<string>(new Date().toISOString());

	const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const formattedDate = selectedDate.toISOString();
			setDate(formattedDate);
		}
	};

	const dateAsDateObject = date ? new Date(date) : new Date();

	const onSubmit = useCallback(() => {
		handleSubmit(name, date);

		setName('');
		setDate('');
	}, [date, handleSubmit, name]);

	return (
		<Modal isOpen={isModalOpen} onClose={toggle}>
			<ModalBackdrop />

			<ModalContent>
				<ModalHeader>
					<Heading>Add Game Film</Heading>
					<ModalCloseButton onPress={toggle}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<FormControl mb="$8">
						<FormControlLabel>
							<FormControlLabelText>Opposing Team</FormControlLabelText>
						</FormControlLabel>

						<Input>
							<InputField
								value={name}
								onChangeText={setName}
								placeholder="Team"
								type="text"
							/>
						</Input>
					</FormControl>

					<FormControl isInvalid={!!error} alignItems="center">
						<DateTimePicker value={dateAsDateObject} onChange={handleDateChange} />

						<FormControlError>
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText>{error}</FormControlErrorText>
						</FormControlError>
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

export default AddGameFilmModal;
