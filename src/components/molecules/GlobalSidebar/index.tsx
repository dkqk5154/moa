import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import hideRouters from 'config/globalHideRouters';
import Button from 'components/atoms/Button';

const Styled = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 300px;
		padding: var(--space5);
		background-color: var(--gray6);
		color: var(--white);
		font-size: var(--font-size5);
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
		<Styled.Wrapper>
			<Button>CUSTOM</Button>
		</Styled.Wrapper>
	);
};

export default withRouter(GlobalSidebar);
