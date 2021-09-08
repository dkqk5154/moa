import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import hideRouters from 'config/globalHideRouters';
import { loginRouter } from 'config/routerUrl';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		border: 0px;
	`,
};

export interface GlobalNavProps extends RouteChildrenProps {}

const GlobalNav = (props: RouteChildrenProps): JSX.Element => {
	const { location } = props;

	const isHide = hideRouters.some(
		(res: string) => res === location?.pathname,
	);

	return isHide ? (
		<></>
	) : (
		<Styled.Wrapper p={5} bg="gray6" color="white" fontSize={5}>
			<GlobalStyled.Container flexDirection="row">
				<GlobalStyled.Col width={30}>
					<b>{`{LOGO}`}</b>
				</GlobalStyled.Col>
				<GlobalStyled.Col justifyContent="flex-end" width={70}>
					<GlobalStyled.Link to={loginRouter.root.value} fontSize={3}>
						<b>Login</b>
					</GlobalStyled.Link>
				</GlobalStyled.Col>
			</GlobalStyled.Container>
		</Styled.Wrapper>
	);
};

export default withRouter(GlobalNav);
