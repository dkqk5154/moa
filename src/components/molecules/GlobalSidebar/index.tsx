import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import hideRouters from 'config/globalHideRouters';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		height: 100%;
		width: 300px;
	`,
};

export interface GlobalSidebarProps extends RouteChildrenProps {}

const GlobalSidebar = (props: RouteChildrenProps): JSX.Element => {
	const { location } = props;

	const isHide = hideRouters.some(
		(res: string) => res === location?.pathname,
	);

	return isHide ? (
		<></>
	) : (
		<Styled.Wrapper p={5} bg="gray6" color="white" fontSize={5}>
			<GlobalStyled.Container flexDirection="row"></GlobalStyled.Container>
		</Styled.Wrapper>
	);
};

export default withRouter(GlobalSidebar);
