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
	border,
	BorderProps,
} from 'styled-system';

import Svg from 'images/Svg';

type MultiTypes = ColorProps & TypographyProps & SpaceProps & BorderProps;

export interface MenuButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	children?: any;
	imageName: string;
	[key: string]: any;
}

const Styled = {
	Button: styled.button<MultiTypes & MenuButtonProps>`
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
		min-height: 28px;
		width: 100%;
		border: 2px solid ${props => props.theme.colors.white};
		border-radius: ${props => props.theme.radii[2]}px;
		font-size: ${props => props.theme.fontSizes[4]}px;
		padding: 0px ${props => props.theme.space[4]}px;
		color: ${props => props.theme.colors.gray800};
		background-color: ${props => props.theme.colors.white};
		box-shadow: 0 2px 6px #0000001f;
		:hover {
			border-color: ${props => props.theme.colors.blue500};
		}
		:active {
			color: ${props => props.theme.colors.white};
			background-color: ${props => props.theme.colors.blue500};
		}
		:disabled {
			color: ${props => props.theme.colors.white};
			background-color: ${props => props.theme.colors.gray100};
			border-color: ${props => props.theme.colors.gray100};
			:hover {
				border-color: ${props => props.theme.colors.gray100};
			}
		}
		${typography}
		${space}
        ${color}
        ${layout}
	    ${border}
	`,
};

const MenuButton = (props: MenuButtonProps) => {
	const { children, imageName } = props;
	const info = { ...props };

	if (info.children !== undefined && info.children !== null) {
		delete info.children;
	}
	if (info.imageName !== undefined && info.imageName !== null) {
		delete info.imageName;
	}

	return (
		<Styled.Button {...info}>
			{children}
			<Svg
				name={imageName}
				size="16px"
				stroke={info.disabled ? 'white' : 'blue500'}
				strokeWidth="2px"
			/>
		</Styled.Button>
	);
};
MenuButton.defaultProps = {
	children: '',
	imageName: 'rightArrow',
};

export default MenuButton;
