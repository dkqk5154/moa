import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import GlobalSidebar from 'components/ui/molecules/GlobalSidebar';
import Character from 'components/objects/Character';
import Block from 'components/objects/Block';
import TileBlock from 'components/objects/Block/TileBlock';
import SystemBlock from 'components/objects/Block/SystemBlock';
import ObjectBlock from 'components/objects/Block/ObjectBlock';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	setPosition,
	setImageInfo,
	setSize,
} from 'components/objects/Character/characterSlice';
import { setBlockInfos } from 'components/objects/Block/blockSlice';
// import { setBuildBlockInfos } from 'components/atoms/BuildMenu/buildMenuSlice';

import { selectStatus } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';

import tileSource from 'images/Tile';
import characterSource from 'images/Character';
import GlobalPopupMenu from 'components/ui/organisms/GlobalPopupMenu';

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
		position: relative;
		display: flex;
		height: 100%;
		width: 100%;
	`,
};

const mapStartPoint = { x: -128, y: -128 };
const mapSize = { width: 300, height: 300 };
const spawnPoint = { x: 16 * 5, y: 16 * 5 };

const MainPage = (): JSX.Element => {
	const MapWrapperRef = useRef(null);
	const [mapContainerInfo, setMapContainerInfo] = useState({
		width: 0,
		height: 0,
	});

	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setImageInfo(characterSource));
		dispatch(
			setSize({
				width: characterSource.width,
				height: characterSource.height,
			}),
		);
		dispatch(setPosition(spawnPoint));

		let mapBlockInfos = [];
		for (
			let i = mapStartPoint.y;
			i < mapSize.height + mapStartPoint.y;
			i += tileSource[0].height
		) {
			for (
				let j = mapStartPoint.x;
				j < mapSize.width + mapStartPoint.x;
				j += tileSource[0].width
			) {
				mapBlockInfos.push({
					name: 'woodTile',
					point: { x: j, y: i },
					size: {
						width: tileSource[0].width,
						height: tileSource[0].height,
					},
					key: '1',
					type: 'tile',
					imageInfo: {
						source: tileSource[0].sources[1],
						...tileSource[0],
					},
				});
				mapBlockInfos.push({
					name: 'systemBlock',
					point: { x: j, y: i },
					size: {
						width: tileSource[0].width,
						height: tileSource[0].height,
					},
					key: '1',
					type: 'system',
					imageInfo: {
						...tileSource[0],
					},
				});
			}
		}
		dispatch(
			setBlockInfos({
				infos: [
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
					<GlobalPopupMenu />
					<Character {...mapContainerInfo} canvasSize={mapSize} />
					<Block {...mapContainerInfo} />
					<TileBlock {...mapContainerInfo} />
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
