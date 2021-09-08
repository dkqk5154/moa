import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

interface ToggleButtonsInterface {
	isOn: boolean;
	onChange: (val: boolean) => void;
	onText: string;
	offText: string;
	borderRadius?: string | number;
	borderColor?: string;
}

interface ButtonProps {
	isActive: ToggleButtonsInterface['isOn'];
	borderRadius?: ToggleButtonsInterface['borderRadius'];
	borderColor?: ToggleButtonsInterface['borderColor'];
}

const Styled = {
	Wrapper: styled(GlobalStyled.Col)<{ borderRadius?: string | number }>`
		width: 100%;
		box-shadow: ${props => props.theme.colors.shadow} 10px 5px 7px 0px;
		border-radius: ${props =>
			props.borderRadius ? props.borderRadius : '3rem'};
	`,
	Button: styled.button<ButtonProps>`
		font-size: 1em;
		padding: 0.5rem;
		width: 50%;
		border: 0.2rem solid
			${props =>
				props.borderColor
					? props.theme.colors[props.borderColor]
					: props.theme.colors.primary3};
		background-color: ${props =>
			props.isActive
				? props.theme.colors.white
				: props.theme.colors.primary3};
		color: ${props =>
			props.isActive
				? props.theme.colors.primary3
				: props.theme.colors.white};
		border-radius: ${props =>
			props.borderRadius
				? `${props.borderRadius} 0 0 ${props.borderRadius}`
				: `3rem 0 0 3rem`};
		:first-child {
			border-right: 0;
		}
		:last-child {
			border-left: 0;
			border-radius: ${props =>
				props.borderRadius
					? `0 ${props.borderRadius} ${props.borderRadius} 0`
					: `0 3rem 3rem 0`};
		}
	`,
};

const Toggle = (props: ToggleButtonsInterface) => {
	const { isOn, onText, offText, onChange, borderColor, borderRadius } =
		props;

	const handleChangeToggle = (e: boolean) => {
		onChange(e);
	};

	return (
		<Styled.Wrapper borderRadius={borderRadius}>
			<Styled.Button
				onClick={() => handleChangeToggle(true)}
				isActive={isOn}
				borderRadius={borderRadius}
				borderColor={borderColor}
			>
				{onText}
			</Styled.Button>
			<Styled.Button
				onClick={() => handleChangeToggle(false)}
				isActive={!isOn}
				borderRadius={borderRadius}
				borderColor={borderColor}
			>
				{offText}
			</Styled.Button>
		</Styled.Wrapper>
	);
};
export default Toggle;

Toggle.defaultProps = {
	isOn: false,
	onText: '왼쪽',
	offText: '오른쪽',
	onChange: function () {},
};
