import { Box } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { getGameFilm, GameFilmResponse } from 'network/gameFilm';
import React, { useCallback, useEffect, useState, useRef } from 'react';

import AddGameFilmModal from './AddGameFilmModal';
import Header from './Header';

const GameFilmDetails: React.FC = () => {
	const router = useRoute();
	const playbookId = (router.params as { id: string })?.id;
	const team = (router.params as { team: string })?.team;

	const videoRef = useRef<Video | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [videoList, setVideoList] = useState<string[]>([]);
	const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const toggleIsModalOpen = useCallback(() => {
		setIsModalOpen(prev => !prev);
	}, []);

	const preloadNextVideo = useCallback(async () => {
		if (currentVideoIndex < videoList.length - 1) {
			const nextVideoSource = videoList[currentVideoIndex + 1];
			if (nextVideoSource) {
				await videoRef.current?.loadAsync({ uri: nextVideoSource }, {}, false);
				await videoRef.current?.playAsync();
			}
		}
	}, [currentVideoIndex, videoList]);

	const handleVideoEnd = async () => {
		if (currentVideoIndex < videoList.length - 1) {
			setCurrentVideoIndex(prev => prev + 1);

			await videoRef.current?.unloadAsync();
			preloadNextVideo();
			await videoRef.current?.playAsync();
		}
	};

	useEffect(() => {
		if (videoList.length > 0) {
			videoRef.current
				?.loadAsync({ uri: videoList[currentVideoIndex] }, {}, false)
				.then(() => videoRef.current?.playAsync())
				.then(preloadNextVideo)
				.catch(error => {
					console.error('Error loading or playing video:', error);
				});
		}
	}, [currentVideoIndex, preloadNextVideo, videoList]);

	useEffect(() => {
		const fetchGameFilm = async () => {
			setIsLoading(true);

			try {
				const res = (await getGameFilm(playbookId)) as GameFilmResponse;

				if (res) {
					setVideoList(res.videos);
				}
			} catch (error) {
				console.error('Error fetching game film:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGameFilm();
	}, [playbookId]);

	return (
		<Box flex={1}>
			<Header toggle={toggleIsModalOpen} />
			<Video
				style={{ width: '100%', height: 250, backgroundColor: 'black' }}
				source={{ uri: videoList[currentVideoIndex] }}
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

			<AddGameFilmModal
				isOpen={isModalOpen}
				toggle={toggleIsModalOpen}
				playbookId={playbookId}
				team={team}
			/>
		</Box>
	);
};

export default GameFilmDetails;
