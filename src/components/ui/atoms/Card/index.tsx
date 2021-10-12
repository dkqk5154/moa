import styled, { keyframes, css } from 'styled-components';
import {
	typography,
	TypographyProps,
	space,
	SpaceProps,
	color,
	ColorProps,
	layout,
	flexbox,
	FlexboxProps,
} from 'styled-system';
import theme from 'styles/theme';

const CardInFocus = keyframes`
 	from { 
		box-shadow : 0px 0px 10px 0px ${theme.colors.shadow}; 
	}
	to { 
		border-color: ${theme.colors.blue}; 
		box-shadow : 0px 0px 10px 0px ${theme.colors.shadow}; 
	}
`;

const CardOutFocus = keyframes`
	from { 
		box-shadow : 0px 0px 10px 0px ${theme.colors.shadow}; 
	}
	to { 
		box-shadow : 0px 0px 10px 0px ${theme.colors.shadow}; 
  	}
`;

// const CardTheme = {

// };

const CardCss = css<CardProps>`
	display: flex;
	position: relative;
	width: 100%;
	height: 100%;
	flex-direction: column;
	padding: ${theme.space[4]}px;
	background-color: ${theme.colors.gray4};
	color: ${theme.colors.white};
	justify-content: center;
	border-radius: ${theme.radii[3]}px;
	border: 1px solid ${theme.colors.gray3};
`;

export interface CardProps {}

type StyledSystemProps = ColorProps &
	TypographyProps &
	SpaceProps &
	CardProps &
	FlexboxProps;

const Card = styled.div<StyledSystemProps & CardProps>`
	${CardCss};
	${typography}
	${space} 
	${color} 
	${layout}
	${flexbox}
`;

export interface CardButtonProps
	extends CardProps,
		React.HTMLProps<HTMLButtonElement> {}

export const CardButton = styled.button<StyledSystemProps & CardButtonProps>`
	${CardCss};
	animation: ${CardOutFocus} 0.25s;
	:hover {
		animation: ${CardInFocus} 0.25s;
		border-color: ${props => props.theme.colors.blue};
	}
	${typography}
	${space}
    ${color}
    ${layout}
	${flexbox}
`;

export const StatusCard = styled(Card)``;

export default Card;
