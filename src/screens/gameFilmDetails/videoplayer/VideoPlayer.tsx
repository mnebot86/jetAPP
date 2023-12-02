import { Box } from '@gluestack-ui/themed';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import React, { useRef, useCallback, useState, useEffect } from 'react';

interface VideoPlayerProps {
	videoSources: string[];
	currentVideoIndex: number;
	setCurrentVideoIndex: React.Dispatch<React.SetStateAction<number>>;
}

const VideoPlayer = ({
	videoSources,
	currentVideoIndex,
	setCurrentVideoIndex,
}: VideoPlayerProps) => {
	const videoRef = useRef<Video | null>(null);

	const preloadNextVideo = useCallback(async () => {
		if (currentVideoIndex < videoSources.length - 1) {
			const nextVideoSource = videoSources[currentVideoIndex + 1];
			if (nextVideoSource) {
				await videoRef.current?.loadAsync({ uri: nextVideoSource }, {}, false);
				await videoRef.current?.playAsync();
			}
		}
	}, [currentVideoIndex, videoSources]);

	const handleVideoEnd = async () => {
		if (currentVideoIndex < videoSources.length - 1) {
			setCurrentVideoIndex(prev => prev + 1);

			await videoRef.current?.unloadAsync();
			preloadNextVideo();
			await videoRef.current?.playAsync();
		}
	};

	useEffect(() => {
		if (videoSources.length > 0) {
			videoRef.current
				?.loadAsync({ uri: videoSources[currentVideoIndex] }, {}, false)
				.then(() => videoRef.current?.playAsync())
				.then(preloadNextVideo)
				.catch(error => {
					console.error('Error loading or playing video:', error);
				});
		}
	}, [currentVideoIndex, preloadNextVideo, videoSources]);

	return (
		<Box>
			<Video
				style={{ width: '100%', height: 250, backgroundColor: 'black' }}
				source={{ uri: videoSources[currentVideoIndex] }}
				useNativeControls
				resizeMode={ResizeMode.COVER}
				ref={videoRef}
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
