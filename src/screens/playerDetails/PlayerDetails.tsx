import { Box, Image, Text, HStack, Heading, ScrollView, Spinner } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import { getPlayer } from 'network/player';
import React, { useEffect, useState } from 'react';
import { PlayerResponse } from 'utils/interface';

const PlayerDetails = () => {
	const router = useRoute();

	const [isLoading, setIsLoading] = useState(false);
	const [player, setPlayer] = useState<PlayerResponse | null>(null);

	useEffect(() => {
		const fetchPlayer = async () => {
			setIsLoading(true);

			try {
				const player = (await getPlayer(
					(router.params as { _id: string })?._id
				)) as PlayerResponse;

				if (player) {
					setPlayer(player);
				}
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlayer();
	}, [router]);

	return (
		<>
			{isLoading ? (
				<Spinner flex={1} />
			) : (
				<ScrollView flex={1}>
					{player?.avatar ? (
						<Image
							w="$full"
							source={{ uri: player?.avatar.url }}
							alt="profile"
							h={350}
							role="img"
						/>
					) : null}

					<Box paddingHorizontal={20} pt="$4">
						<HStack w="$full" justifyContent="space-between" mb="2%">
							<Heading>{`${player?.firstName} ${player?.lastName}`}</Heading>
							<Text bold># {player?.jerseyNumber}23</Text>
						</HStack>

						<Text mb="2%">Absents: {player?.totalAbsent}</Text>

						<HStack mb="2%">
							<Text>Positions: </Text>
							{player?.positions.map((pos, idx) => (
								<Text key={`position-${idx}`}>{pos}</Text>
							))}
						</HStack>

						<HStack mb="2%">
							<Text>Medical: </Text>
							{player?.medicalConditions.map((med, idx) => (
								<Text key={`med-${idx}`}>{med}</Text>
							))}
						</HStack>

						<HStack mb="2%">
							<Text>Allergies: </Text>
							{player?.positions.map((pos, idx) => (
								<Text key={`allergies-${idx}`}>{pos}</Text>
							))}
						</HStack>

						<Text>Striper: {player?.isStriper ? 'Yes' : 'No'}</Text>
					</Box>
				</ScrollView>
			)}
		</>
	);
};

export default PlayerDetails;
