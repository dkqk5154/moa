import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import { selectTileInfos } from 'components/objects/Block/blockSlice';
import { selectPosition } from 'components/objects/Character/characterSlice';
import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import { loadingCanvasImageInfo, scaleBlockCanvasDraw } from 'utils/canvas';

const Styled = {
	Tile: styled.canvas`
		position: absolute;
		top: 0;
		z-index: -100;
		background-color: var(--black);
	`,
};

export interface MapProps {
	width: number;
	height: number;
}

const TileBlock = ({ width, height }: MapProps): JSX.Element => {
	const tileInfos = useAppSelector(selectTileInfos);
	const scale = useAppSelector(selectScale);
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});

	// const dispatch = useAppDispatch();

	const point = useAppSelector(selectPosition);

	useEffect(() => {
		const loadingCanvasImage = async () => {
			const imageInfos = await loadingCanvasImageInfo({
				blockInfos: tileInfos,
				scale: scale,
			});
			setLoadingImageInfo(prevState => {
				return { ...imageInfos, ...prevState };
			});
		};
		loadingCanvasImage();
	}, [tileInfos, scale]);

	useEffect(() => {
		if (canvasRef && Object.keys(loadingImageInfo).length) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			scaleBlockCanvasDraw({
				canvas,
				ctx,
				infos: tileInfos,
				point,
				loadingImageInfo,
				scale,
			});
		}
	}, [point, width, height, tileInfos, loadingImageInfo, scale]);

	return <Styled.Tile ref={canvasRef} width={width} height={height} />;
};

export default TileBlock;
