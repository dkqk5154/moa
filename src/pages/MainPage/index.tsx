import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import GlobalSidebar from 'components/ui/molecules/GlobalSidebar';
import Character from 'components/objects/Character';
import Block from 'components/objects/Block';
import Map from 'components/objects/Map';
import SystemBlock from 'components/objects/Block/SystemBlock';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	setPosition,
	setImageInfo,
	setSize,
} from 'components/objects/Character/characterSlice';
import {
	setBlockInfos,
	BlockStateInfosProps,
} from 'components/objects/Block/blockSlice';
// import { setBuildBlockInfos } from 'components/atoms/BuildMenu/buildMenuSlice';

import { selectStatus } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';

import TestBlock from 'images/TestBlock';
import TestTile from 'images/TestTile';
import TestUser from 'images/TestUser';
import ObjectBlock from 'components/objects/Block/ObjectBlock';

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
		height: 100%;
		width: 100%;
	`,
};

const testBlockInfos: Array<BlockStateInfosProps> = new Array(120).fill({
	point: { x: 0, y: 0 },
	size: {
		width: TestBlock.info.grayBlock.width,
		height: TestBlock.info.grayBlock.height,
	},
	key: '1',
	type: 'block',
	imageInfo: {
		source: TestBlock.source,
		...TestBlock.info.grayBlock,
	},
});

const testTileInfos: Array<BlockStateInfosProps> = new Array(60).fill({
	point: { x: 0, y: 0 },
	size: {
		width: TestTile.info.grassTile.width,
		height: TestTile.info.grassTile.height,
	},
	key: '1',
	type: 'tile',
	imageInfo: {
		source: TestTile.source,
		...TestTile.info.grassTile,
	},
});

const mapSize = { width: 1280, height: 1080 };
const spawnPoint = { x: 48 * 5, y: 48 * 5 };

const MainPage = (): JSX.Element => {
	const MapWrapperRef = useRef(null);
	const [mapContainerInfo, setMapContainerInfo] = useState({
		width: 0,
		height: 0,
	});

	const status = useAppSelector(selectStatus);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setImageInfo(TestUser));
		dispatch(setSize({ width: TestUser.width, height: TestUser.height }));
		dispatch(setPosition(spawnPoint));

		let mapBlockInfos = [];
		for (
			let i = 0;
			i < mapSize.height;
			i += TestTile.info.grassTile.height
		) {
			for (
				let j = 0;
				j < mapSize.width;
				j += TestTile.info.grassTile.width
			) {
				mapBlockInfos.push({
					point: { x: j, y: i },
					size: {
						width: TestTile.info.grassTile.width,
						height: TestTile.info.grassTile.height,
					},
					key: '1',
					type: 'tile',
					imageInfo: {
						source: TestTile.source,
						...TestTile.info.grassTile,
					},
				});
				mapBlockInfos.push({
					point: { x: j, y: i },
					size: {
						width: TestTile.info.grassTile.width,
						height: TestTile.info.grassTile.height,
					},
					key: '1',
					type: 'system',
					imageInfo: {
						source: TestTile.source,
						...TestTile.info.grassTile,
					},
				});
			}
		}

		//test block
		const formatBlockInfos = testBlockInfos.map(
			(res: BlockStateInfosProps, i) => {
				const lineBlockCount = 50;
				if (i >= lineBlockCount * 3) {
					return {
						...res,
						point: {
							x: res.point.x,
							y:
								lineBlockCount * res.size.height -
								(i - lineBlockCount * 3) * res.size.height,
						},
					};
				} else if (i >= lineBlockCount * 2) {
					return {
						...res,
						point: {
							x:
								lineBlockCount * res.size.width -
								(i - lineBlockCount * 2) * res.size.width,
							y: lineBlockCount * res.size.height,
						},
					};
				} else if (i >= lineBlockCount) {
					return {
						...res,
						point: {
							x: lineBlockCount * res.size.width,
							y: (i - lineBlockCount) * res.size.height,
						},
					};
				}
				return {
					...res,
					point: {
						x: i * res.size.width,
						y: 0,
					},
				};
			},
		);

		//test tile
		const formatTileInfos = testTileInfos.map(
			(res: BlockStateInfosProps, i) => {
				let y = Math.round(i / 5);
				return {
					...res,
					point: { x: res.size.width * i, y: res.size.height * y },
				};
			},
		);

		dispatch(
			setBlockInfos({
				infos: [
					...formatBlockInfos,
					...formatTileInfos,
					...mapBlockInfos,
					{
						point: spawnPoint,
						size: {
							width: 48,
							height: 48,
						},
						key: 'spawn_point',
						type: 'system',
						imageInfo: {},
					},
				],
			}),
		);
	}, [dispatch]);

	useEffect(() => {
		if (status === 'home') {
			dispatch(setPosition(spawnPoint));
		}
	}, [status, dispatch]);

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
					<Character {...mapContainerInfo} mapSize={mapSize} />
					<Block {...mapContainerInfo} />
					<Map {...mapContainerInfo} />
					<ObjectBlock {...mapContainerInfo} />
					{status === 'build' ? (
						<SystemBlock {...mapContainerInfo} />
					) : (
						''
					)}
				</Styled.MapWrapper>
			</Styled.Container>
		</Styled.Wrapper>
	);
};

export default MainPage;
