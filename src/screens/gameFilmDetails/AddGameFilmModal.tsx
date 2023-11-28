import {
	Button,
	ButtonGroup,
	ButtonSpinner,
	ButtonText,
	CloseIcon,
	Heading,
	Icon,
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@gluestack-ui/themed';
import { uploadGameFilms } from 'network/gameFilm';
import React, { useCallback, useState } from 'react';

import UploadFilm from './UploadFilmButton';

interface AddGameFilmModalProps {
	isOpen: boolean;
	toggle: () => void;
	playbookId: string;
	team: string;
}

export interface VideoData {
	assetId: string;
	base64?: string | null;
	duration: number;
	exif: null;
	fileName: string;
	fileSize: number;
	height: number;
	type: string;
	uri: string;
	width: number;
}

const AddGameFilmModal = ({ isOpen, toggle, playbookId, team }: AddGameFilmModalProps) => {
	const [isUpload, setIsUploading] = useState(false);
	const [selectedVideos, setSelectedVideos] = useState<VideoData[] | []>([]);

	const currentYear: number = new Date().getFullYear();

	const handleClose = useCallback(() => {
		setSelectedVideos([]);

		toggle();
	}, [toggle]);

	const onSubmit = useCallback(async () => {
		setIsUploading(true);

		try {
			if (!selectedVideos.length) return;

			const formData = new FormData();

			for (const video of selectedVideos) {
				const file: any = {
					uri: video.uri,
					type: video.fileName.split('.')[1],
					mimetype: video.type,
					name: video.fileName.split('.')[0],
				};

				formData.append('videos', file);
				formData.append('team', team);
				formData.append('year', currentYear.toString());
			}

			const results = await uploadGameFilms(formData, playbookId);

			if (results) {
				handleClose();
			}
		} catch (error) {
			console.error('Error uploading videos:', error);
		} finally {
			setIsUploading(false);
		}
	}, [playbookId, selectedVideos, currentYear, team, handleClose]);

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<ModalBackdrop />

			<ModalContent>
				<ModalHeader>
					<Heading size="lg">Add Films</Heading>

					<ModalCloseButton onPress={toggle}>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<UploadFilm
						setSelectedVideos={setSelectedVideos}
						selectedVideos={selectedVideos}
					/>
				</ModalBody>

				<ModalFooter>
					<ButtonGroup>
						<Button variant="outline" onPress={toggle}>
							<ButtonText onPress={handleClose}>Cancel</ButtonText>
						</Button>

						<Button onPress={onSubmit}>
							<ButtonText>Submit</ButtonText>
							<ButtonSpinner pl="$3" animating={isUpload} />
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddGameFilmModal;
