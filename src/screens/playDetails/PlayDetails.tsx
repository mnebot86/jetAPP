import { ScrollView, Text, Image } from '@gluestack-ui/themed';
import { useRoute } from '@react-navigation/native';
import React from 'react';

const PlayDetails = () => {
	const route = useRoute();

	const name = (route.params as { name: string })?.name;
	const image = (route.params as { image: string })?.image;
	const description = (route.params as { description: string })?.description;

	return (
		<ScrollView>
			{image ? (
				<Image
					source={image}
					size="full"
					height={200}
					mt={10}
					resizeMode="contain"
					role="img"
					alt={name}
				/>
			) : null}

			<Text textAlign="center" px="$8" mt="$8">
				{description}
			</Text>
		</ScrollView>
	);
};

export default PlayDetails;
