import { Center, Spinner, Box } from '@gluestack-ui/themed';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { GameVideo } from 'network/gameFilm';
import React, { useCallback, useEffect, useState } from 'react';
import { COLORS } from 'utils/styles';

interface VideoPlayerProps {
	videoRef: React.MutableRefObject<Video | null>;
	videoSources: GameVideo[];
	currentVideoIndex: number;
	setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>;
}

const VideoPlayer = ({
	videoRef,
	videoSources,
	currentVideoIndex,
	setCurrentVideoIndex,
}: VideoPlayerProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const preloadNextVideo = useCallback(async () => {
		if (currentVideoIndex < videoSources.length - 1 && videoRef.current) {
			const nextVideoSource = videoSources[currentVideoIndex + 1];
			if (nextVideoSource) {
				await videoRef.current?.loadAsync({ uri: nextVideoSource.url }, {}, false);
				await videoRef.current?.playAsync();
			}
		}
	}, [currentVideoIndex, videoSources, videoRef]);

	const handleVideoEnd = useCallback(async () => {
		if (currentVideoIndex < videoSources.length - 1) {
			setCurrentVideoIndex(prev => prev + 1);

			await videoRef.current?.unloadAsync();
			preloadNextVideo();
			await videoRef.current?.playAsync();
		}
	}, [currentVideoIndex, videoSources, videoRef, preloadNextVideo, setCurrentVideoIndex]);

	useEffect(() => {
		if (videoSources.length > 0 && videoRef.current) {
			videoRef.current
				?.loadAsync({ uri: videoSources[currentVideoIndex].url }, {}, false)
				.then(() => videoRef.current?.playAsync())
				.then(preloadNextVideo)
				.catch(error => {
					console.error('Error loading or playing video:', error);
				});
		}
	}, [currentVideoIndex, preloadNextVideo, videoSources, videoRef]);

	return (
		<Box sx={{ position: 'relative', mt: 8 }}>
			{isLoading ? (
				<Center
					zIndex={2}
					w="$full"
					h={250}
					top={0}
					left={0}
					bg={COLORS.white}
					sx={{ _dark: { bg: COLORS.darkenBlack, position: 'absolute' } }}>
					<Spinner />
				</Center>
			) : null}

			<Video
				style={{ width: '100%', height: 250, backgroundColor: 'black' }}
				source={{ uri: videoSources[currentVideoIndex].url }}
				useNativeControls
				resizeMode={ResizeMode.COVER}
				ref={videoRef}
				onLoadStart={() => setIsLoading(true)}
				onLoad={() => setIsLoading(false)}
				onPlaybackStatusUpdate={(
					status: AVPlaybackStatus & { didJustFinish?: boolean }
				) => {
					if (status.didJustFinish) {
						handleVideoEnd();
					}
				}}
			/>
		</Box>
	);
};

export default VideoPlayer;
