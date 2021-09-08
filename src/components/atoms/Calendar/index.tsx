import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Swal, { SweetAlertOptions } from 'sweetalert2';

import GlobalStyled from 'styles/GlobalStyled';
import moment, { unitOfTime } from 'moment';

import { diffLabel } from 'utils/date';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		padding: ${props => props.theme.space[1]}px;
		.react-daterange-picker__wrapper {
			z-index: 20;
			border: 0px;
			background-color: ${({ theme }) => theme.colors.gray100};
			padding: 0px;
			padding-left: ${({ theme }) => theme.space[2]}px;
		}
		.react-daterange-picker__calendar-button {
			padding: 0px;
			:focus {
				outline: none;
			}
		}
		.react-daterange-picker__clear-button {
			display: none;
		}
	`,
	Icon: styled.img`
		width: 36px;
		height: 36px;
	`,
};

export interface CalendarProps {
	infos: Array<moment.Moment>;
	dateType: unitOfTime.Diff;
	onChange: (dates: Array<moment.Moment>) => void;
	maxRange: number;
	minDate: moment.Moment;
	maxDate: moment.Moment;
}

const Calendar = (props: CalendarProps) => {
	const { infos, dateType, onChange, maxRange, minDate, maxDate } = props;

	const [dateRangePickerInfos, setDateRangePickerInfos] = useState({
		format: '',
		minDetail: 'century',
		maxDetail: 'month',
	});

	const limitDayRangeSwal = {
		icon: 'error',
		title: '날짜설정 한도를 초과하였습니다!',
		text: `최대 ${maxRange}${diffLabel(dateType)}까지 설정 가능합니다.`,
		confirmButtonText: '확인',
	} as SweetAlertOptions;

	useEffect(() => {
		if (dateType === 'day') {
			setDateRangePickerInfos({
				format: 'y-MM-dd',
				minDetail: 'century',
				maxDetail: 'month',
			});
		} else if (dateType === 'month') {
			setDateRangePickerInfos({
				format: 'y-MM',
				minDetail: 'century',
				maxDetail: 'year',
			});
		} else if (dateType === 'year') {
			setDateRangePickerInfos({
				format: 'y',
				minDetail: 'century',
				maxDetail: 'decade',
			});
		} else {
			setDateRangePickerInfos({
				format: 'y-MM-dd',
				minDetail: 'century',
				maxDetail: 'month',
			});
		}
	}, [dateType]);

	const handleChangeDateRangePicker = (e: Array<Date>) => {
		const maxE = moment(e[0]).diff(e[1], dateType) >= 1 ? e[0] : e[1];
		const minE = moment(e[0]).diff(e[1], dateType) >= 1 ? e[1] : e[0];
		if (moment(maxE).diff(minE, dateType) <= maxRange) {
			onChange([moment(minE), moment(maxE)]);
		} else {
			Swal.fire(limitDayRangeSwal);
		}
	};

	return (
		<Styled.Wrapper>
			<DateRangePicker
				value={infos.map(
					(res: moment.Moment) =>
						new Date(moment(res).format('YYYY-MM-DD')),
				)}
				onChange={handleChangeDateRangePicker}
				calendarIcon={
					<Styled.Icon src={require('./ic-calendar.svg').default} />
				}
				clearIcon={<span></span>}
				{...dateRangePickerInfos}
				maxDate={new Date(moment(maxDate).format('YYYY-MM-DD'))}
				minDate={new Date(moment(minDate).format('YYYY-MM-DD'))}
			/>
		</Styled.Wrapper>
	);
};
Calendar.defaultProps = {
	infos: [moment(), moment()],
	onChange: () => {},
	dateType: 'month',
	maxRange: 9999,
	maxDate: moment(),
	minDate: moment().add(-1, 'month'),
};

export default Calendar;
