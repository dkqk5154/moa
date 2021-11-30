import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import { selectBlockInfos } from './blockSlice';
import { selectPosition } from 'components/objects/Character/characterSlice';
import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import { loadingCanvasImageInfo, scaleBlockCanvasDraw } from 'utils/canvas';

const Styled = {
	Block: styled.canvas`
		position: absolute;
		z-index: -50;
		top: 0;
	`,
};

export interface BlockProps {
	width: number;
	height: number;
}

const Block = ({ width, height }: BlockProps): JSX.Element => {
	const blockInfos = useAppSelector(selectBlockInfos);
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});

	const point = useAppSelector(selectPosition);
	const scale = useAppSelector(selectScale);

	useEffect(() => {
		const loadingCanvasImage = async () => {
			const imageInfos = await loadingCanvasImageInfo({
				blockInfos: blockInfos,
				scale: scale,
			});
			setLoadingImageInfo(prevState => {
				return { ...imageInfos, ...prevState };
			});
		};
		loadingCanvasImage();
	}, [blockInfos, scale]);

	useEffect(() => {
		if (canvasRef && Object.keys(loadingImageInfo).length) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			scaleBlockCanvasDraw({
				canvas,
				ctx,
				infos: blockInfos,
				point,
				loadingImageInfo,
				scale,
			});
		}
	}, [point, width, height, blockInfos, loadingImageInfo, scale]);

	return <Styled.Block ref={canvasRef} width={width} height={height} />;
};

export default Block;
