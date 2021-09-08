import React from 'react';
import Card from 'components/atoms/Card';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
	`,
	Canvas: styled.canvas`
		margin: auto;
	`,
	ScaleImg: styled.img``,
};

const MainPage = (): JSX.Element => {
	return (
		<Styled.Wrapper>
			<GlobalStyled.Container flexDirection="row">
				<GlobalStyled.Col
					flexDirection="column"
					width={40}
					p={4}
				></GlobalStyled.Col>
				<GlobalStyled.Col flexDirection="column" width={60} p={4}>
					<GlobalStyled.Row mb={4}>
						<Card></Card>
					</GlobalStyled.Row>
					<GlobalStyled.Row>
						<Card></Card>
					</GlobalStyled.Row>
				</GlobalStyled.Col>
			</GlobalStyled.Container>
		</Styled.Wrapper>
	);
};

export default MainPage;
