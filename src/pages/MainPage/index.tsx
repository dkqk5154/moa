import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import GlobalSidebar from 'components/molecules/GlobalSidebar';
import Character from 'components/atoms/Character';
import Block from 'components/atoms/Block';

import { useAppDispatch } from 'app/hooks';
import { setPosition } from 'components/atoms/Character/characterSlice';
import { setInfos } from 'components/atoms/Block/blockSlice';

import TestBlock from 'images/TestBlock';

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

const testBlockInfos = new Array(30).fill({
	x: 0,
	y: 0,
	key: '1',
	imageInfo: {
		source: TestBlock.source,
		width: TestBlock.width,
		height: TestBlock.height,
		sx: TestBlock.grayBlock.sx,
		sy: TestBlock.grayBlock.sy,
	},
});

const MainPage = (): JSX.Element => {
	const MapWrapperRef = useRef(null);
	const [mapContainerInfo, setMapContainerInfo] = useState({
		width: 0,
		height: 0,
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPosition({ x: 64, y: 64 }));
		dispatch(
			setInfos({
				infos: testBlockInfos.map((res, i) => {
					if (i >= 15) {
						return {
							...res,
							y: (i - 15) * res.imageInfo.height,
						};
					}
					return {
						...res,
						x: i * res.imageInfo.width,
					};
				}),
			}),
		);
	}, [dispatch]);

	const handleResize = () => {
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
					<Block {...mapContainerInfo} />
				</Styled.MapWrapper>
			</GlobalStyled.Container>
		</Styled.Wrapper>
	);
};

export default MainPage;
