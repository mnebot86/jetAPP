import { Box, Center, Spinner, Text } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { GameFilmResponse, GameVideo, addVideoComment, getGameFilm } from 'network/gameFilm';
import { socket } from 'network/socket';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameFilmVideoUploadOpen } from 'store/selectors/modalsState';
import { toggleIsGameFilmVideoUploadOpen } from 'store/slices/modals';
import { COLORS } from 'utils/styles';

import AddGameFilmModal from './AddGameFilmModal';
import AddVideoCommentModal from './AddVideoCommentModal';
import Header from './Header';
import VideoList from './VideoList';
import VideoPlayer from './videoplayer/VideoPlayer';

const GameFilmDetails: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRoute();

	const isGameFilmModalOpen = useSelector(getGameFilmVideoUploadOpen);

	const playbookId = (router.params as { id: string })?.id;
	const team = (router.params as { team: string })?.team;

	const videoRef = useRef<Video | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [videoSources, setVideoSources] = useState<GameVideo[]>([]);
	const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
	const [isVideoCommentModalOpen, setIsVideoCommentModalOpen] = useState<boolean>(false);
	const [currentVideoTimeStamp, setCurrentVideoTimestamp] = useState<number>(0);
	const [videoComment, setVideoComment] = useState<string>('');

	const pauseVideo = async () => {
		if (videoRef.current) {
			videoRef.current.setStatusAsync({ shouldPlay: false });
		}
	};

	const getVideoPosition = async () => {
		const videoPosition = await videoRef.current?.getStatusAsync();
		//@ts-ignore
		setCurrentVideoTimestamp(videoPosition?.positionMillis);
	};

	const toggleIsGameFilmModalOpen = useCallback(() => {
		dispatch(toggleIsGameFilmVideoUploadOpen());
	}, [dispatch]);

	const toggleIsVideoCommentModalOpen = useCallback(() => {
		setIsVideoCommentModalOpen(prev => !prev);
		pauseVideo();
		getVideoPosition();
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
			setVideoSources(newVideoSources);
		});

		return () => {
			socket.off('video_upload');
		};
	}, []);

	useEffect(() => {
		socket.on('video_comment', newVideoComment => {
			console.log('Video Comment', newVideoComment);

			setVideoSources(prevVideoSources => {
				const oldVideoIndex = prevVideoSources.findIndex(
					video => video._id === newVideoComment._id
				);

				if (oldVideoIndex !== -1) {
					const updatedVideoSources = [...prevVideoSources];
					updatedVideoSources[oldVideoIndex] = newVideoComment;

					return updatedVideoSources;
				} else {
					return [...prevVideoSources, newVideoComment];
				}
			});
		});

		return () => {
			socket.off('video_comment');
		};
	}, []);

	const handleAddVideoCommentSubmit = useCallback(async () => {
		setIsLoading(true);

		const videoId = videoSources[currentVideoIndex]._id;

		const data = {
			videoTimestamp: currentVideoTimeStamp,
			comment: videoComment,
			playerTags: [],
		};

		try {
			await addVideoComment(playbookId, videoId, data);
		} catch (error) {
			console.error('Error adding video comment:', error);
		} finally {
			setIsLoading(false);

			toggleIsVideoCommentModalOpen();
		}
	}, [
		currentVideoIndex,
		videoSources,
		videoComment,
		playbookId,
		currentVideoTimeStamp,
		toggleIsVideoCommentModalOpen,
	]);

	const hasVideoSources = useMemo(() => videoSources?.length > 0, [videoSources]);

	return (
		<>
			{isLoading ? (
				<Center
					flex={1}
					gap="$2"
					bg={COLORS.white}
					sx={{ _dark: { bg: COLORS.darkenBlack } }}>
					<Spinner animating size="large" />
					<Text textAlign="center">Loading...</Text>
				</Center>
			) : (
				<Box flex={1} bg={COLORS.white} sx={{ _dark: { bg: COLORS.darkenBlack } }}>
					{hasVideoSources ? (
						<>
							<VideoPlayer
								videoRef={videoRef}
								videoSources={videoSources}
								currentVideoIndex={currentVideoIndex}
								setCurrentVideoIndex={setCurrentVideoIndex}
							/>
						</>
					) : null}

					<VideoList
						videoSources={videoSources}
						currentVideoIndex={currentVideoIndex}
						setCurrentVideoIndex={setCurrentVideoIndex}
					/>

					<AddGameFilmModal
						isOpen={isGameFilmModalOpen}
						toggle={toggleIsGameFilmModalOpen}
						playbookId={playbookId}
						team={team}
					/>
				</Box>
			)}

			<AddVideoCommentModal
				isOpen={isVideoCommentModalOpen}
				toggle={toggleIsVideoCommentModalOpen}
				timestamp={currentVideoTimeStamp}
				videoComment={videoComment}
				setVideoComment={setVideoComment}
				onSubmit={handleAddVideoCommentSubmit}
			/>
		</>
	);
};

export default GameFilmDetails;
