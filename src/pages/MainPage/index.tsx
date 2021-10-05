import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import GlobalSidebar from 'components/molecules/GlobalSidebar';
import Character from 'components/atoms/Character';
import Block from 'components/atoms/Block';
import Tile from 'components/atoms/Tile';

import { useAppDispatch } from 'app/hooks';
import {
	setPosition,
	setImageInfo,
	setSize,
} from 'components/atoms/Character/characterSlice';
import { setBlockInfos } from 'components/atoms/Block/blockSlice';

import TestBlock from 'images/TestBlock';
import TestTile from 'images/TestTile';
import TestUser from 'images/TestUser';

const Styled = {
	Wrapper: styled.div`
		display: flex;
		flex-direction: column;
		height: 100%;
	`,
	Container: styled.div`
		display: flex;
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

const testBlockInfos = new Array(120).fill({
	position: { x: 0, y: 0 },
	size: { width: TestBlock.width, height: TestBlock.height },
	key: '1',
	type: 'block',
	imageInfo: {
		source: TestBlock.source,
		width: TestBlock.width,
		height: TestBlock.height,
		sx: TestBlock.grayBlock.sx,
		sy: TestBlock.grayBlock.sy,
	},
});

const testTileInfos = new Array(60).fill({
	position: { x: 0, y: 0 },
	size: { width: TestTile.width, height: TestTile.height },
	key: '1',
	type: 'tile',
	imageInfo: {
		source: TestTile.source,
		width: TestTile.width,
		height: TestTile.height,
		sx: TestTile.grassTile.sx,
		sy: TestTile.grassTile.sy,
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

		//test block
		const formatBlockInfos = testBlockInfos.map((res, i) => {
			const lineBlockCount = 50;
			if (i >= lineBlockCount * 3) {
				return {
					...res,
					position: {
						x: res.position.x,
						y:
							lineBlockCount * res.imageInfo.height -
							(i - lineBlockCount * 3) * res.imageInfo.height,
					},
				};
			} else if (i >= lineBlockCount * 2) {
				return {
					...res,
					position: {
						x:
							lineBlockCount * res.imageInfo.width -
							(i - lineBlockCount * 2) * res.imageInfo.width,
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
		});

		//test tile
		const formatTileInfos = testTileInfos.map((res, i) => {
			let y = Math.round(i / 5);
			return {
				...res,
				position: { x: res.size.width * i, y: res.size.height * y },
			};
		});

		dispatch(
			setBlockInfos({
				infos: [...formatBlockInfos, ...formatTileInfos],
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
			<Styled.Container>
				<GlobalSidebar />
				<Styled.MapWrapper ref={MapWrapperRef}>
					<Character {...mapContainerInfo} />
					<Block {...mapContainerInfo} />
					<Tile {...mapContainerInfo} />
				</Styled.MapWrapper>
			</Styled.Container>
		</Styled.Wrapper>
	);
};

export default MainPage;
