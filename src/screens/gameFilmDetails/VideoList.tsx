import { Box, Center, Image, Pressable, Text } from '@gluestack-ui/themed';
import { GameVideo } from 'network/gameFilm';
import React, { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { getColorMode } from 'store/selectors/appState';
import { COLORS, themedStyle } from 'utils/styles';

interface VideoListProps {
	videoSources: GameVideo[];
	currentVideoIndex: number;
	setCurrentVideoIndex: (index: number) => void;
}

const VideoList = ({ videoSources, currentVideoIndex, setCurrentVideoIndex }: VideoListProps) => {
	const colorMode = useSelector(getColorMode);

	const flatListRef = useRef<FlatList | null>(null);

	const renderItem = ({ item, index }: { item: GameVideo; index: number }) => {
		const thumbNail = item.url.replace('mov', 'jpg');

		const handleVideoPress = (index: number) => {
			setCurrentVideoIndex(index);
		};

		return (
			<Box>
				<Box>
					<Pressable
						flexDirection="row"
						paddingHorizontal={16}
						paddingVertical={12}
						bg={
							currentVideoIndex === index
								? 'royalblue'
								: themedStyle(colorMode, COLORS.darkenBlack, COLORS.white)
						}
						borderRadius={8}
						$active-bg="$primary400"
						onPress={() => handleVideoPress(index)}>
						<Image
							width={99}
							borderRadius={8}
							source={{
								uri: thumbNail,
							}}
							alt="Video Thumbnail"
						/>
					</Pressable>
				</Box>
			</Box>
		);
	};

	const keyExtractor = (item: GameVideo, index: number) => index.toString();

	useEffect(() => {
		if (
			flatListRef.current &&
			videoSources.length > 0 &&
			currentVideoIndex >= 0 &&
			currentVideoIndex < videoSources.length
		) {
			flatListRef.current.scrollToIndex({
				index: currentVideoIndex,
				animated: true,
				// viewPosition: 1,
			});
		}
	}, [currentVideoIndex, videoSources]);

	return (
		<FlatList
			ref={flatListRef}
			data={videoSources}
			renderItem={renderItem}
			ListEmptyComponent={
				<Center>
					<Text textAlign="center">Add Videos</Text>
				</Center>
			}
			keyExtractor={keyExtractor}
			style={{ flex: 1, marginTop: 8 }}
		/>
	);
};

export default VideoList;
