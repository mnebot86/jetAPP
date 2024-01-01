import { Box, HStack, Text } from '@gluestack-ui/themed';
import * as Localization from 'expo-localization';
import { MessageResponse } from 'network/message';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import { getUserId } from 'store/selectors/user';
import { formattedDate, formattedTime } from 'utils/dateTime';

interface MessagesProps {
	messages: MessageResponse[] | [];
}

type DateSection = {
	title: string;
	data: MessageResponse[];
};

const Messages = ({ messages }: MessagesProps) => {
	const userId = useSelector(getUserId);

	const sectionListRef = useRef<SectionList | null>(null);

	const [userTimeZone, setUserTimeZone] = useState<string>('UTC');

	const todayDate = new Date().toISOString();

	const groupedMessages = useMemo(() => {
		return messages.reduce((acc: { [key: string]: MessageResponse[] }, item) => {
			const date = formattedDate(item.createdAt, false);

			if (!acc[date]) {
				acc[date] = [];
			}

			acc[date].push(item);

			return acc;
		}, {});
	}, [messages]);

	const sections: DateSection[] = Object.entries(groupedMessages).map(([title, data]) => ({
		title,
		data,
	}));

	useEffect(() => {
		const fetchUserTimeZone = async () => {
			const zone = Localization.getCalendars();

			if (zone) setUserTimeZone(zone[0].timeZone!);
		};
		fetchUserTimeZone();
	}, []);

	useEffect(() => {
		if (messages.length) {
			const timer = setTimeout(() => {
				sectionListRef.current?.getScrollResponder()?.scrollToEnd();
			}, 350);

			return () => clearTimeout(timer);
		}
	}, [messages]);

	const renderItem = ({ item }: { item: MessageResponse }) => {
		const isOwner = userId === item.createdBy._id;

		return (
			<Box
				paddingHorizontal={15}
				pb={15}
				pt={5}
				alignSelf={isOwner ? 'flex-end' : 'flex-start'}
				maxWidth="80%">
				{!isOwner ? (
					<Text sub>{`${item.createdBy.firstName} ${item.createdBy.lastName[0]}`}</Text>
				) : null}

				<Box
					bg={!isOwner ? 'lightgray' : '$lightBlue600'}
					borderRadius={12}
					paddingHorizontal={12}
					paddingVertical={6}>
					<Text lineHeight={24} color={!isOwner ? 'black' : 'white'}>
						{item.message}
					</Text>
				</Box>

				<HStack justifyContent={isOwner ? 'flex-end' : 'flex-start'} mt="$2">
					<Text size="xs">{formattedTime(item.createdAt, userTimeZone)}</Text>
				</HStack>
			</Box>
		);
	};

	const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
		<Text textAlign="center" size="sm" pt="$2">
			{formattedDate(todayDate, false) === title ? 'Today' : title}
		</Text>
	);

	return (
		<SectionList
			sections={sections}
			ListEmptyComponent={
				<Text textAlign="center" pt="$10">
					No Messages
				</Text>
			}
			renderItem={renderItem as any}
			renderSectionHeader={renderSectionHeader as any}
			keyExtractor={(item: any) => item._id}
			ref={sectionListRef}
		/>
	);
};

export default Messages;
