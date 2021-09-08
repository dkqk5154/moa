import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko'; // 이줄 추가

import GlobalStyled from 'styles/GlobalStyled';
import { TransparentButton } from 'components/atoms/Button';

interface DateButtonStyledProps {
	isSelect?: boolean;
	width: string;
}

const Styled = {
	Wrapper: styled(TransparentButton)<DateButtonStyledProps>`
		flex-direction: column;
		padding: ${({ theme }) => `${theme.space[1]}px ${theme.space[2]}px`};
		width: ${({ width }) => width};
		height: ${({ height }) => height};
		background-color: ${({ isSelect, theme }) =>
			isSelect ? theme.colors.blue500 : theme.colors.transparent};
		color: ${({ isSelect, theme }) =>
			isSelect ? theme.colors.white : theme.colors.blue500};
		border-radius: 1rem;
	`,
};

export interface DateButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	info: moment.Moment | string;
	isSelect?: boolean;
	width: string;
	height: string;
	children?: React.ReactNode;
}

const DateRadioButton = (props: DateButtonProps) => {
	const { info, children } = props;
	return (
		<Styled.Wrapper {...props} fontSize={3}>
			<GlobalStyled.Row bottom={1}>
				<b>{moment(info).format('ddd')}</b>
			</GlobalStyled.Row>
			<GlobalStyled.Row fontSize={3}>
				<b>{moment(info).format('MM/DD')}</b>
			</GlobalStyled.Row>
			<GlobalStyled.HeightRow>{children}</GlobalStyled.HeightRow>
		</Styled.Wrapper>
	);
};
DateRadioButton.defaultProps = {
	info: moment(),
	width: '56px',
	height: '142px',
};

export default DateRadioButton;
