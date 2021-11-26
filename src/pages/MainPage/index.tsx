import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';

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

import {
	selectStatus,
	setScale,
} from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';

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

const mapResizeScale = [360, 1480, 1980];
const mapStartPoint = { x: -16 * 8, y: -16 * 8 };
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
					direction: 'up',
					point: { x: j, y: i },
					size: {
						width: tileSource[0].width,
						height: tileSource[0].height,
					},
					key: `${moment().format('YYYYMMDDHHMMss')}${j}-${i}`,
					type: 'tile',
					imageInfo: {
						source: tileSource[0].sources[1],
						...tileSource[0],
					},
				});
				mapBlockInfos.push({
					name: 'systemBlock',
					direction: 'up',
					point: { x: j, y: i },
					size: {
						width: tileSource[0].width,
						height: tileSource[0].height,
					},
					key: `${moment().format('YYYYMMDDHHMMss')}${j}-${i}`,
					type: 'system',
					imageInfo: {
						...tileSource[0],
					},
				});
			}
		}
		console.log(mapBlockInfos);
		dispatch(
			setBlockInfos({
				infos: [
					...mapBlockInfos,
					{
						point: spawnPoint,
						size: {
							width: 16 * 3,
							height: 16 * 3,
						},
						key: 'spawn_point',
						type: 'system',
						imageInfo: {},
					},
				],
			}),
		);
	}, [dispatch]);

	const mapResizeSetScale = useCallback(
		(offsetWidth: number) => {
			if (offsetWidth < mapResizeScale[0]) {
				dispatch(setScale(1));
			} else if (offsetWidth < mapResizeScale[1]) {
				dispatch(setScale(2));
			} else {
				dispatch(setScale(3));
			}
		},
		[dispatch],
	);

	useEffect(() => {
		if (status === 'home') {
			dispatch(setPosition(spawnPoint));
		}
	}, [status, dispatch]);

	useEffect(() => {
		if (MapWrapperRef.current) {
			const offsetWidth = MapWrapperRef?.current?.offsetWidth;
			mapResizeSetScale(offsetWidth);
		}
	}, [mapResizeSetScale]);

	const handleResize = useCallback(() => {
		const offsetWidth = MapWrapperRef?.current?.offsetWidth;
		const offsetHeight = MapWrapperRef?.current?.offsetHeight;
		mapResizeSetScale(offsetWidth);
		setMapContainerInfo({
			width: offsetWidth,
			height: offsetHeight,
		});
	}, [mapResizeSetScale]);

	useEffect(() => {
		setMapContainerInfo({
			width: MapWrapperRef?.current?.offsetWidth,
			height: MapWrapperRef?.current?.offsetHeight,
		});
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [handleResize]);

	return (
		<Styled.Wrapper>
			<Styled.Container>
				<GlobalSidebar />
				<Styled.MapWrapper ref={MapWrapperRef}>
					<GlobalPopupMenu />
					<Character {...mapContainerInfo} />
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
