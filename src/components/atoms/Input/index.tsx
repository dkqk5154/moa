import React, { forwardRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
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
import GlobalStyled from 'styles/GlobalStyled';
import theme from 'styles/theme';
import Svg, { SvgProps } from 'images/Svg';

type MultiTypes = ColorProps & TypographyProps & SpaceProps;

export type colorThemeProps = {
	[key in 'red' | 'blue' | 'green' | 'gray']: {
		border: string;
		color: string;
	};
};

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		justify-content: center;
		flex-direction: row;
	`,
	Label: styled(GlobalStyled.Row)`
		align-items: center;
		font-size: ${props => props.theme.fontSizes[1]}px;
		color: ${props => props.theme.colors.gray300};
		width: 45%;
	`,
	Input: styled.input<{ css: any; icon: string } & MultiTypes & InputProps>`
		font-size: ${props =>
			props.fontSize ? props.fontSize : props.theme.fontSizes[2] + 'px'};
		font-weight: bold;
		width: 100%;
		min-height: 28px;
		outline: none;
		background: url(${props => props.icon}) no-repeat left center;
		background-position: 8px;
		background-color: ${props => props.theme.colors.white};
		color: ${props => colorThemes[props.colorTheme].color};
		border-radius: ${({ theme, inputTheme }) =>
			inputTheme === 'line' ? '' : theme.radii[1]}px;
		padding: 0px
			${props =>
				props.inputTheme === 'default'
					? props.theme.space[3]
					: props.theme.space[2]}px;
		border: ${props =>
			props.inputTheme === 'default'
				? colorThemes[props.colorTheme].border
				: 'none'};
		border-bottom: ${props =>
			props.inputTheme === 'line'
				? colorThemes[props.colorTheme].border
				: ''};
		::placeholder {
			font-weight: normal;
			color: ${props => colorThemes[props.colorTheme].color};
		}
		:focus {
			border: ${props =>
				props.inputTheme === 'default'
					? '2px solid' + props.theme.colors.blue500
					: 'none'};
			border-bottom: ${props =>
				props.inputTheme === 'line'
					? '2px solid' + props.theme.colors.blue500
					: ''};
			::placeholder {
				font-weight: normal;
				color: ${props => props.theme.colors.blue500};
			}
			color: ${props => props.theme.colors.gray800};
		}
		:not(:focus) {
			opacity: 0.875;
		}
		:read-only {
			opacity: 0.5;
			color: ${props => props.theme.colors.white};
			:focus {
				color: ${props => props.theme.colors.white};
			}
		}
		:disabled {
			border-color: ${props => props.theme.colors.gray300};
			background-color: ${props => props.theme.colors.gray100};
		}
		${typography}
		${space}
		${color}
		${layout}
		${props => props.css}
	`,
};

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string | JSX.Element;
	css?: any;
	imageInfo?: SvgProps;
	padding?: number;
	fontSize?: number | string;
	colorTheme?: string;
	inputTheme?: 'default' | 'line';
}

const colorThemes: colorThemeProps = {
	red: {
		border: '2px solid' + theme.colors.danger1,
		color: theme.colors.danger1,
	},
	blue: {
		border: '2px solid' + theme.colors.blue500,
		color: theme.colors.blue500,
	},
	green: {
		border: '2px solid' + theme.colors.success1,
		color: theme.colors.success1,
	},
	gray: {
		border: '1px solid' + theme.colors.gray1,
		color: theme.colors.gray1,
	},
};

const Input = forwardRef((props: InputProps, ref): JSX.Element => {
	const { label, css, imageInfo } = props;

	const svgString = encodeURIComponent(
		renderToStaticMarkup(<Svg {...imageInfo} />),
	);
	const dataUri = imageInfo.name ? `data:image/svg+xml,${svgString}` : '';

	return (
		<Styled.Wrapper>
			{label ? <Styled.Label mr={1}>{label}</Styled.Label> : ''}
			<Styled.Input
				{...props}
				css={css}
				icon={dataUri}
				paddingLeft={dataUri ? '36px' : undefined}
			/>
		</Styled.Wrapper>
	);
});

Input.defaultProps = {
	colorTheme: 'gray',
	inputTheme: 'default',
	imageInfo: {
		name: '',
	},
};

export default Input;
