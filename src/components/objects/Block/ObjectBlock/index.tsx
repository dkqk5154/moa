import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import {
	selectObjectBlockInfos,
	BlockStateInfoProps,
} from 'components/objects/Block/blockSlice';
import { selectPosition } from 'components/objects/Character/characterSlice';
import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import { loadingCanvasImageInfo } from 'utils/canvas';

const Styled = {
	Block: styled.canvas`
		position: absolute;
		z-index: 100;
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
		const imageInfos = loadingCanvasImageInfo({
			blockInfos: objectBlockInfos,
			scale: scale,
		});
		setLoadingImageInfo(prevState => {
			return { ...imageInfos, ...prevState };
		});
	}, [objectBlockInfos, scale]);

	useEffect(() => {
		if (canvasRef && Object.keys(loadingImageInfo).length) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.translate(
				canvas.width / 2 - point.x,
				canvas.height / 2 - point.y,
			);

			objectBlockInfos.forEach((res: BlockStateInfoProps) => {
				ctx.drawImage(
					loadingImageInfo[res.imageInfo.sources[scale]],
					res.imageInfo.up.sx,
					res.imageInfo.up.sy,
					res.size.width,
					res.size.height,
					res.point.x,
					res.point.y,
					res.size.width,
					res.size.height,
				);
			});

			ctx.restore();
		}
	}, [point, width, height, objectBlockInfos, loadingImageInfo, scale]);

	return <Styled.Block ref={canvasRef} width={width} height={height} />;
};

export default ObjectBlock;
