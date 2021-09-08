import moment, { unitOfTime } from 'moment';

const yearDiffs = ['year', 'years', 'y'];
const monthDiffs = ['month', 'months', 'M'];
const weekDiffs = ['week', 'weeks', 'w'];
const dayDiffs = ['day', 'days', 'd'];
const hourDiffs = ['hour', 'hours', 'h'];
const minuteDiffs = ['minute', 'minutes', 'm'];
const secondDiffs = ['second', 'seconds', 's'];
const millisecondDiffs = ['millisecond', 'milliseconds', 'ms'];

export const getTimeLabel = () => {
	let result = [];
	for (let a = 0; a < 24; a++) {
		result.push(`${a}`);
	}
	return result;
};

export const matchDate = ({
	startDate,
	matchDate,
}: {
	startDate: moment.Moment;
	matchDate: moment.Moment;
}) =>
	matchDate.diff(moment(startDate), 'days') < 0
		? moment(startDate)
		: moment(matchDate);

export const getRealTimeLabels = (startDay?: moment.Moment) => {
	let matchDay = startDay ? moment(startDay) : moment();
	let result = [];
	while (moment(new Date()).startOf('month').diff(matchDay) <= 0) {
		result.push(Number(matchDay.format('DD')));
		matchDay.add(-1, 'day');
	}
	if (result.length === 0) {
		result.push(Number(matchDay.format('DD')));
	}
	return result.sort((a: any, b: any) => a - b);
};

export const getMomentRanges = (params: {
	startDate?: moment.Moment;
	endDate?: moment.Moment;
	format?: string;
	dateType?: unitOfTime.Diff;
}) => {
	let { startDate = moment() } = params;
	const {
		format,
		endDate = moment().startOf('days'),
		dateType = 'days',
	} = params;
	let result = [];

	startDate = moment(startDate).startOf('days');

	while (moment(endDate).diff(startDate, dateType) >= 0) {
		result.push(
			format ? moment(startDate).format(format) : moment(startDate),
		);
		startDate = moment(startDate).add(+1, dateType);
	}
	if (result.length === 0) {
		result.push(moment(startDate).startOf('day'));
	}
	return result.sort(
		(a: any, b: any) =>
			Number(moment(a).format('YYYYMMDD')) -
			Number(moment(b).format('YYYYMMDD')),
	);
};

export const getMomentStartDate = ({
	date,
	matchDate,
	dateType = 'days',
}: {
	date: moment.Moment;
	matchDate: moment.Moment;
	dateType?: unitOfTime.Diff;
}) => {
	return moment(matchDate).diff(moment(date), 'days') <= 1
		? moment(date).startOf(dateType)
		: moment(matchDate);
};

export const getMomentEndDate = ({
	date,
	matchDate,
	dateType = 'days',
}: {
	date: moment.Moment;
	matchDate: moment.Moment;
	dateType?: unitOfTime.Diff;
}) => {
	return moment(matchDate).diff(moment(date), 'days') >= 1
		? moment(date).endOf(dateType)
		: moment(matchDate);
};

export const diffLabel = (dateType: unitOfTime.Diff) => {
	if (yearDiffs.some((res: string) => res === dateType)) {
		return '년';
	} else if (monthDiffs.some((res: string) => res === dateType)) {
		return '월';
	} else if (weekDiffs.some((res: string) => res === dateType)) {
		return '주';
	} else if (dayDiffs.some((res: string) => res === dateType)) {
		return '일';
	} else if (hourDiffs.some((res: string) => res === dateType)) {
		return '시';
	} else if (minuteDiffs.some((res: string) => res === dateType)) {
		return '분';
	} else if (secondDiffs.some((res: string) => res === dateType)) {
		return '초';
	} else if (millisecondDiffs.some((res: string) => res === dateType)) {
		return '밀리초';
	}
	return '';
};
