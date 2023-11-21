import { KeyboardAvoidingView, Spinner } from '@gluestack-ui/themed';
import { MessageResponse, createMessage, getAllMessages } from 'network/message';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import InputBox from './InputBox';
import Messages from './Messages';

function Chat() {
	const [isLoading, setLoading] = useState(false);
	const [messages, setMessages] = useState<MessageResponse[] | []>([]);

	const sendMessage = useCallback(async (message: string) => {
		const data = {
			message,
		};

		if (!message.length) return;

		try {
			(await createMessage(data)) as MessageResponse;
		} catch (error) {
			throw error;
		}
	}, []);

	useEffect(() => {
		const fetchAllMessages = async () => {
			setLoading(true);
			try {
				const res = (await getAllMessages()) as MessageResponse[];

				if (res) {
					setMessages(res);
				}
			} catch (error) {
				throw error;
			} finally {
				setLoading(false);
			}
		};

		fetchAllMessages();
	}, []);

	useEffect(() => {
		socket.on('new_message', newMessage => {
			setMessages(prev => [...prev, newMessage]);
		});

		return () => {
			socket.off('new_message');
		};
	}, []);

	return (
		<KeyboardAvoidingView
			flex={1}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={100}>
			{isLoading ? <Spinner flex={1} /> : <Messages messages={messages} />}

			<InputBox sendMessage={sendMessage} />
		</KeyboardAvoidingView>
	);
}

export default Chat;
