import { Box, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import { Send } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';

interface InputBoxProps {
	sendMessage: (message: string) => void;
}

const InputBox = ({ sendMessage }: InputBoxProps) => {
	const [newMessage, setNewMessage] = useState<string>('');

	const onSubmit = useCallback(() => {
		if (!newMessage.length) return;

		sendMessage(newMessage);

		setNewMessage('');
	}, [newMessage, sendMessage, setNewMessage]);

	return (
		<Box paddingHorizontal="$4" paddingVertical="$2">
			<Input>
				<InputField multiline type="text" onChangeText={setNewMessage} value={newMessage} />

				<InputSlot pr="$2" onPress={onSubmit}>
					<InputIcon as={Send} />
				</InputSlot>
			</Input>
		</Box>
	);
};

export default InputBox;
