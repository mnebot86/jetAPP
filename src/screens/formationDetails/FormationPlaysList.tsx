import { Center, Text } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { PlayData } from 'network/formation';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

type FormationPlaysListProps = {
	plays: PlayData[];
};

type PlayItem = {
	item: PlayData;
};

const FormationPlaysList = ({ plays }: FormationPlaysListProps) => {
	const navigation: any = useNavigation();

	const renderItem = ({ item }: PlayItem) => {
		return (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('PlayDetails', {
						image: item.image.url,
						name: item.name,
						description: item.description,
					})
				}>
				<Center p="$8" borderBottomWidth={2} borderBottomColor="lightgray">
					<Text bold>{item.name}</Text>
				</Center>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			style={{ height: '100%' }}
			data={plays}
			ListEmptyComponent={
				<Text textAlign="center" mt="$6">
					Add a new Play!
				</Text>
			}
			renderItem={renderItem}
			extraData={(item: PlayData) => item._id}
		/>
	);
};

export default FormationPlaysList;
