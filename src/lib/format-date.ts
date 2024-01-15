export function formatDate(subject: Date) {
	const month = months[subject.getMonth()];
	const date = subject.getDate().toString().padStart(2, '0');
	const year = subject.getFullYear();
	const day = days[subject.getDay()];

	return `${day} ${month} ${date} ${year}`;
}

const days = [
	//
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat',
];

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];
