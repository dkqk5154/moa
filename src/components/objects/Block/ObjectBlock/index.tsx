import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import { selectObjectBlockInfos } from 'components/objects/Block/blockSlice';
import { selectPosition } from 'components/objects/Character/characterSlice';
import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import { loadingCanvasImageInfo, scaleBlockCanvasDraw } from 'utils/canvas';

const Styled = {
	Block: styled.canvas`
		position: absolute;
		z-index: 50;
		top: 0;
	`,
};

export interface ObjectBlockProps {
	width: number;
	height: number;
}

const ObjectBlock = ({ width, height }: ObjectBlockProps): JSX.Element => {
	const objectBlockInfos = useAppSelector(selectObjectBlockInfos);
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});

	const point = useAppSelector(selectPosition);
	const scale = useAppSelector(selectScale);

	useEffect(() => {
		const loadingCanvasImage = async () => {
			const imageInfos = await loadingCanvasImageInfo({
				blockInfos: objectBlockInfos,
				scale: scale,
			});
			setLoadingImageInfo(prevState => {
				return { ...imageInfos, ...prevState };
			});
		};
		loadingCanvasImage();
	}, [objectBlockInfos, scale]);

	useEffect(() => {
		if (canvasRef && Object.keys(loadingImageInfo).length) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			scaleBlockCanvasDraw({
				canvas,
				ctx,
				infos: objectBlockInfos,
				point,
				loadingImageInfo,
				scale,
			});
		}
	}, [point, width, height, objectBlockInfos, loadingImageInfo, scale]);

	return <Styled.Block ref={canvasRef} width={width} height={height} />;
};

export default ObjectBlock;
