export const formattedDate = (timeString: string, year: boolean): string => {
	return new Date(timeString).toLocaleString('en-US', {
		year: year ? 'numeric' : undefined,
		month: '2-digit',
		day: '2-digit',
		timeZone: 'UTC',
	});
};

export const formattedTime = (timeString: string, timeZone: string): string => {
	return new Date(timeString).toLocaleString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
		timeZone,
	});
};
