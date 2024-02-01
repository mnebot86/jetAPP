export const millisecondsToTime = (milliseconds: number): string => {
	const seconds: number = Math.floor(milliseconds / 1000);

	const hours: number = Math.floor(seconds / 3600);
	const minutes: number = Math.floor((seconds % 3600) / 60);
	const remainingSeconds: number = seconds % 60;

	let timeFormat: string = '';

	if (hours > 0) {
		timeFormat += String(hours).padStart(2, '0') + ':';
	}

	timeFormat += String(minutes).padStart(2, '0') + ':';
	timeFormat += String(remainingSeconds).padStart(2, '0');

	return timeFormat;
};
