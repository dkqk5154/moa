import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import GlobalSidebar from 'components/molecules/GlobalSidebar';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		height: 100%;
	`,
	Canvas: styled.canvas`
		margin: auto;
	`,
};

const MainPage = (): JSX.Element => {
	return (
		<Styled.Wrapper>
			<GlobalStyled.Container flexDirection="row">
				<GlobalStyled.Col flexDirection="column" width={20}>
					<GlobalSidebar />
				</GlobalStyled.Col>
				<GlobalStyled.Col flexDirection="column" width={80}>
					<Styled.Canvas />
				</GlobalStyled.Col>
			</GlobalStyled.Container>
		</Styled.Wrapper>
	);
};

export default MainPage;
