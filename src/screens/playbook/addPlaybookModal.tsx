import {
	Button,
	ButtonText,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectIcon,
	SelectInput,
	SelectItem,
	SelectPortal,
	SelectTrigger,
	Heading,
	ButtonGroup,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
} from '@gluestack-ui/themed';
import { AlertCircleIcon, ChevronDownIcon, X } from 'lucide-react-native';
import React, { useState } from 'react';

interface AddPlaybookModalProps {
	isOpen: boolean;
	toggle: () => void;
	handleSubmit: (name: string) => void;
	error: string | null;
}

function AddPlaybookModal({ isOpen, toggle, handleSubmit, error }: AddPlaybookModalProps) {
	const [name, setName] = useState('');

	return (
		<Modal isOpen={isOpen} onClose={toggle}>
			<ModalBackdrop />

			<ModalContent>
				<ModalHeader>
					<ModalCloseButton>
						<Icon as={X} size="xl" />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<Heading mb={12}>Create New Playbook</Heading>

					<FormControl isInvalid={!!error}>
						<FormControlLabel>
							<FormControlLabelText>Select Name</FormControlLabelText>
						</FormControlLabel>

						<Select
							isRequired
							selectedValue={name}
							onValueChange={value => setName(value)}>
							<SelectTrigger>
								<SelectInput placeholder="Select option" />
								<SelectIcon mr="$3">
									<Icon as={ChevronDownIcon} />
								</SelectIcon>
							</SelectTrigger>

							<SelectPortal>
								<SelectBackdrop />

								<SelectContent>
									<SelectDragIndicatorWrapper>
										<SelectDragIndicator />
									</SelectDragIndicatorWrapper>
									<SelectItem label="Offense" value="Offense" />
									<SelectItem label="Defense" value="Defense" />
									<SelectItem label="Special Team" value="Special Teams" />
								</SelectContent>
							</SelectPortal>
						</Select>

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

						<Button onPress={() => handleSubmit(name)} disabled={!name.length}>
							<ButtonText>Submit</ButtonText>
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default AddPlaybookModal;
