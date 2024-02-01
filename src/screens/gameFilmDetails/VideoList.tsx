import { AnimatedView } from '@gluestack-style/animation-resolver';
import { styled } from '@gluestack-style/react';
import { Box, Center, Text, Pressable } from '@gluestack-ui/themed';
import { GameVideo } from 'network/gameFilm';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';

interface VideoListProps {
	videoSources: GameVideo[];
	currentVideoIndex: number;
	setCurrentVideoIndex: (index: number) => void;
}

const VideoList = ({ videoSources, currentVideoIndex, setCurrentVideoIndex }: VideoListProps) => {
	const flatListRef = useRef<FlatList | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const renderItem = ({ item, index }: { item: GameVideo; index: number }) => {
		const shouldShowComments =
			videoSources[index]?.comments?.length > 0 && index === currentVideoIndex;

		const AnimatedBox = styled(AnimatedView, {
			':initial': {
				maxHeight: 0,
			},
			':animate': {
				maxHeight: 10000,
			},
			':exit': {
				maxHeight: 0,
			},
		});

		const handleVideoPress = (index: number) => {
			setCurrentVideoIndex(index);

			if (shouldShowComments) {
				setIsOpen(true);
			}
		};

		return (
			<Box
				onLayout={event => {
					const { height } = event.nativeEvent.layout;
					console.log(height);
				}}>
				<Box borderColor="lightgray" borderBottomWidth={1}>
					<Pressable
						justifyContent="center"
						p={10}
						bg={currentVideoIndex === index ? 'royalblue' : '#fff'}
						$active-bg="$primary400"
						onPress={() => handleVideoPress(index)}>
						<Text textAlign="center">{index + 1}</Text>
						{/* {shouldShowComments ? <Icon as={MessageSquareWarning} /> : null} */}
					</Pressable>

					<AnimatedBox
						sx={{ display: isOpen && index === currentVideoIndex ? 'flex' : 'none' }}>
						{item.comments?.map(({ comment, createdBy }, idx) => (
							<Box key={`comment-${idx}`} marginVertical="$4" paddingHorizontal={10}>
								<Text sub bold>
									Couch {createdBy.firstName}
								</Text>
								<Text pl="$2" key={idx}>
									{comment}
								</Text>
							</Box>
						))}
					</AnimatedBox>
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
				viewPosition: 0.5,
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
			style={{ flex: 1 }}
		/>
	);
};

export default VideoList;
