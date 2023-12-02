import { Box } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { getGameFilm, GameFilmResponse } from 'network/gameFilm';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import AddGameFilmModal from './AddGameFilmModal';
import Header from './Header';
import VideoList from './VideoList';
import VideoPlayer from './videoplayer/VideoPlayer';

const GameFilmDetails: React.FC = () => {
	const router = useRoute();

	const playbookId = (router.params as { id: string })?.id;
	const team = (router.params as { team: string })?.team;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [videoSources, setVideoSources] = useState<string[]>([]);
	const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const toggleIsModalOpen = useCallback(() => {
		setIsModalOpen(prev => !prev);
	}, []);

	useEffect(() => {
		const fetchGameFilm = async () => {
			setIsLoading(true);

			try {
				const res = (await getGameFilm(playbookId)) as GameFilmResponse;

				if (res) {
					setVideoSources(res.videos);
				}
			} catch (error) {
				console.error('Error fetching game film:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchGameFilm();
	}, [playbookId]);

	useEffect(() => {
		socket.on('video_upload', newVideoSources => {
			setVideoSources([newVideoSources]);
		});

		return () => {
			socket.off('video_upload');
		};
	}, []);

	return (
		<>
			{isLoading ? (
				<ActivityIndicator animating />
			) : (
				<Box flex={1}>
					<Header toggle={toggleIsModalOpen} />

					<VideoPlayer
						videoSources={videoSources}
						currentVideoIndex={currentVideoIndex}
						setCurrentVideoIndex={setCurrentVideoIndex}
					/>

					<VideoList
						videoSources={videoSources}
						currentVideoIndex={currentVideoIndex}
						setCurrentVideoIndex={setCurrentVideoIndex}
					/>

					<AddGameFilmModal
						isOpen={isModalOpen}
						toggle={toggleIsModalOpen}
						playbookId={playbookId}
						team={team}
					/>
				</Box>
			)}
		</>
	);
};

export default GameFilmDetails;
