import {
	Button,
	ButtonGroup,
	ButtonSpinner,
	ButtonText,
	CloseIcon,
	FormControl,
	FormControlLabel,
	FormControlLabelText,
	Heading,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Text,
	Textarea,
	TextareaInput,
} from '@gluestack-ui/themed';
import React from 'react';
import { millisecondsToTime } from 'utils/video';

interface AddVideoCommentModalProps {
	isOpen: boolean;
	toggle: () => void;
	timestamp: number;
	videoComment: string;
	setVideoComment: (comment: string) => void;
	onSubmit: () => void;
}

const AddVideoCommentModal = ({
	isOpen,
	toggle,
	timestamp,
	videoComment,
	setVideoComment,
	onSubmit,
}: AddVideoCommentModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={toggle}>
			<ModalBackdrop />

			<ModalContent>
				<ModalHeader>
					<Heading size="lg">Add Comment</Heading>

					<ModalCloseButton>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<Text bold>Time</Text>
					<Text>{millisecondsToTime(timestamp)}</Text>

					<FormControl mt="$4">
						<FormControlLabel>
							<FormControlLabelText>Comment</FormControlLabelText>
						</FormControlLabel>

						<Textarea>
							<TextareaInput onChangeText={setVideoComment} />
						</Textarea>
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button variant="outline" onPress={toggle}>
							<ButtonText>Cancel</ButtonText>
						</Button>

						<Button onPress={onSubmit}>
							<ButtonText>Submit</ButtonText>
							{/* <ButtonSpinner pl="$3" /> */}
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddVideoCommentModal;
