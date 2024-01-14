import { Text, Box, Center } from '@gluestack-ui/themed';
import { GameVideo } from 'network/gameFilm';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

interface VideoListProps {
	videoSources: GameVideo[];
	currentVideoIndex: number;
	setCurrentVideoIndex: (index: number) => void;
}

const VideoList = ({ videoSources, currentVideoIndex, setCurrentVideoIndex }: VideoListProps) => {
	const renderItem = ({ item, index }: { item: GameVideo; index: number }) => (
		<TouchableOpacity onPress={() => setCurrentVideoIndex(index)}>
			<Box
				padding={10}
				borderColor="lightgray"
				borderBottomWidth={1}
				bg={currentVideoIndex === index ? 'royalblue' : '#fff'}>
				<Text textAlign="center">{index + 1}</Text>
			</Box>
		</TouchableOpacity>
	);

	const keyExtractor = (item: GameVideo, index: number) => index.toString();

	return (
		<FlatList
			data={videoSources}
			renderItem={renderItem}
			ListEmptyComponent={
				<Center>
					<Text textAlign="center">Add Videos</Text>
				</Center>
			}
			keyExtractor={keyExtractor}
			style={{ flex: 1 }}
		/>
	);
};

export default VideoList;
