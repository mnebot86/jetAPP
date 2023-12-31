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
import { DateTimeFormatOptions } from 'intl';
import { AlertCircleIcon } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';

interface AddGameFilmModalProps {
	handleSubmit: (name: string, date: string) => void;
	error: string | null;
	isModalOpen: boolean;
	toggle: () => void;
}

const AddGameFilmModal = ({ handleSubmit, error, toggle, isModalOpen }: AddGameFilmModalProps) => {
	const [name, setName] = useState('');
	const [date, setDate] = useState<string>(new Date().toISOString());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const handleDateChange = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
		if (selectedDate) {
			const formattedDate = selectedDate.toISOString();
			setShowDatePicker(false);
			setDate(formattedDate);
		}
	}, []);

	const toggleDatePicker = () => {
		setShowDatePicker(!showDatePicker);
	};

	const dateAsDateObject = date ? new Date(date) : new Date();

	const formattedDate = (date: string) => {
		const formattedDate = new Date(date);

		const options: DateTimeFormatOptions = {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		};
		return formattedDate.toLocaleDateString('en-US', options);
	};

	const onSubmit = useCallback(() => {
		handleSubmit(name, date);

		setName('');
		setDate('');
	}, [date, handleSubmit, name]);

	const onCancel = useCallback(() => {
		setName('');
		setDate('');
		toggle();
	}, [toggle]);

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
						{Platform.OS === 'ios' ? (
							<DateTimePicker value={dateAsDateObject} onChange={handleDateChange} />
						) : (
							<Button onPress={toggleDatePicker}>
								<ButtonText>{formattedDate(date)}</ButtonText>
							</Button>
						)}

						{showDatePicker && (
							<DateTimePicker
								value={dateAsDateObject}
								onChange={handleDateChange}
								mode="date"
							/>
						)}
						<FormControlError>
							<FormControlErrorIcon as={AlertCircleIcon} />
							<FormControlErrorText>{error}</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button onPress={onCancel}>
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
