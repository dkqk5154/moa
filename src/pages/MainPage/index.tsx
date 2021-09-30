import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';
import GlobalSidebar from 'components/molecules/GlobalSidebar';
import Character from 'components/atoms/Character';
import Block from 'components/atoms/Block';

import { useAppDispatch } from 'app/hooks';
import {
	setPosition,
	setImageInfo,
	setSize,
} from 'components/atoms/Character/characterSlice';
import { setBlockInfos } from 'components/atoms/Block/blockSlice';

import TestBlock from 'images/TestBlock';
import TestUser from 'images/TestUser';

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

const testBlockInfos = new Array(60).fill({
	position: { x: 0, y: 0 },
	size: { width: TestBlock.width, height: TestBlock.height },
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
		dispatch(setImageInfo(TestUser));
		dispatch(setSize({ width: TestUser.width, height: TestUser.height }));
		dispatch(setPosition({ x: 128, y: 128 }));
		dispatch(
			setBlockInfos({
				infos: testBlockInfos.map((res, i) => {
					const lineBlockCount = 50;
					if (i >= lineBlockCount * 3) {
						return {
							...res,
							position: {
								x: res.position.x,
								y:
									lineBlockCount * res.imageInfo.height -
									(i - lineBlockCount * 3) *
										res.imageInfo.height,
							},
						};
					} else if (i >= lineBlockCount * 2) {
						return {
							...res,
							position: {
								x:
									lineBlockCount * res.imageInfo.width -
									(i - lineBlockCount * 2) *
										res.imageInfo.width,
								y: lineBlockCount * res.imageInfo.height,
							},
						};
					} else if (i >= lineBlockCount) {
						return {
							...res,
							position: {
								x: lineBlockCount * res.imageInfo.width,
								y: (i - lineBlockCount) * res.imageInfo.height,
							},
						};
					}
					return {
						...res,
						position: {
							x: i * res.imageInfo.width,
							y: 0,
						},
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
