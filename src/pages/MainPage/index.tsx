import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import GlobalSidebar from 'components/molecules/GlobalSidebar';
import Character from 'components/atoms/Character';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		height: 100%;
	`,
	Canvas: styled.canvas`
		margin: auto;
	`,
	MapWrapper: styled.div`
		display: flex;
		width: 100%;
		height: 100%;
	`,
};

const MainPage = (): JSX.Element => {
	const MapWrapperRef = useRef(null);
	const [mapContainerInfo, setMapContainerInfo] = useState({
		width: 0,
		height: 0,
	});

	const handleResize = () => {
		console.log({
			width: MapWrapperRef?.current?.offsetWidth,
			height: MapWrapperRef?.current?.offsetHeight,
		});
		setMapContainerInfo({
			width: MapWrapperRef?.current?.offsetWidth,
			height: MapWrapperRef?.current?.offsetHeight,
		});
	};

	useEffect(() => {
		setMapContainerInfo({
			width: MapWrapperRef?.current?.offsetWidth,
			height: MapWrapperRef?.current?.offsetHeight,
		});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Styled.Wrapper>
			<GlobalStyled.Container flexDirection="row">
				<GlobalSidebar />
				<Styled.MapWrapper ref={MapWrapperRef}>
					<Character {...mapContainerInfo} />
				</Styled.MapWrapper>
			</GlobalStyled.Container>
		</Styled.Wrapper>
	);
};

export default MainPage;
