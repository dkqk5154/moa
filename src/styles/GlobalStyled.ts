import styled, { css } from 'styled-components';
import {
	typography,
	TypographyProps,
	space,
	SpaceProps,
	color,
	ColorProps,
	layout,
	LayoutProps,
	flexbox,
	FlexboxProps,
	borders,
	BordersProps,
} from 'styled-system';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';

type ParentTypes = ColorProps &
	TypographyProps &
	SpaceProps &
	LayoutProps &
	BordersProps &
	FlexboxProps;

const ParentCss = css<ParentTypes>`
	${typography}
	${space}
	${color}
	${layout}
	${flexbox}
	${borders}
`;

const ParentColCss = css<ParentTypes>`
	${typography}
	${space}
	${color}
	${flexbox}
	${borders}
`;

const Parent = {
	Col: styled.div<{ width?: number }>`
		display: flex;
		width: ${props => props.width}%;
		align-items: center;
		${ParentColCss}
	`,
	Row: styled.div`
		display: flex;
		width: 100%;
		${ParentCss}
	`,
	Container: styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		min-width: 360px;
		margin: 0 auto;
		${ParentCss}
	`,

	Link: styled(Link)<LinkProps>`
		display: flex;
		color: inherit;
		${ParentCss}
	`,
	NavLink: styled(NavLink)<NavLinkProps>`
		display: flex;
		color: inherit;
		${ParentCss}
	`,
	Img: styled.img`
		display: flex;
		${ParentCss}
	`,
};

const GlobalStyled: { [key: string]: any } = {
	Container: styled(Parent.Container)`
		${Parent.Col}:last-child {
			border-left: 0px;
			border-right: 0px;
		}
	`,
	Row: styled(Parent.Row)``,
	HeightRow: styled(Parent.Row)`
		flex-direction: column;
	`,
	Col: styled(Parent.Col)``,
	Link: styled(Parent.Link)``,
	NavLink: styled(Parent.NavLink)``,
	Img: styled(Parent.Img)``,
};

export default GlobalStyled;
