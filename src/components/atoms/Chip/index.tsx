import React from 'react';
import styled from 'styled-components';
import {
	typography,
	TypographyProps,
	space,
	SpaceProps,
	color,
	ColorProps,
	layout,
} from 'styled-system';

import theme from 'styles/theme';

export type StatusProps = {
	[key: string]: {
		backgroundColor: string;
		borderColor: string;
		color: string;
	};
};

export interface ChipProps {
	children?: React.ReactNode;
	padding: string;
	status: string;
	isGhost?: boolean;
	width?: string;
}

const statusInfo: StatusProps = {
	red: {
		backgroundColor: theme.colors.danger1,
		borderColor: theme.colors.danger1,
		color: theme.colors.danger1,
	},
};

type MultiTypes = ColorProps & TypographyProps & SpaceProps;

const Styled = {
	Wrapper: styled.span<ChipProps & MultiTypes>`
		display: flex;
		align-items: center;
		justify-content: center;
		padding: ${props => props.padding};
		border-radius: 42px;
		font-weight: bold;
		min-height: 32px;
		font-size: ${props => props.theme.fontSizes[3]}px;
		border: 2px solid ${props => statusInfo[props.status].borderColor};
		background-color: ${props =>
			props.isGhost
				? props.theme.colors.white
				: statusInfo[props.status].backgroundColor};
		color: ${props =>
			props.isGhost
				? statusInfo[props.status].color
				: props.theme.colors.white};
		${typography}
		${space}
        ${color}
        ${layout}
	`,
};

const Chip = (props: ChipProps): JSX.Element => {
	const { children } = props;

	return <Styled.Wrapper {...props}>{children}</Styled.Wrapper>;
};

Chip.defaultProps = {
	status: 'purple',
	padding: '0.15rem 1rem',
	width: '',
};

export default Chip;
