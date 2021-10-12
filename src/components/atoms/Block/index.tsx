import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import { selectBlockInfos, BlockStateInfosProps } from './blockSlice';
import { selectPosition } from 'components/atoms/Character/characterSlice';

const Styled = {
	Block: styled.canvas`
		position: absolute;
		z-index: 100;
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

	useEffect(() => {
		const imageSourceInfos = Array.from(
			new Set(
				blockInfos.map(
					(res: BlockStateInfosProps) => res.imageInfo.source,
				),
			),
		);

		imageSourceInfos.forEach((res: string) => {
			const imageData = new Image();
			imageData.src = res;
			imageData.onload = () => {
				setLoadingImageInfo(prevState => {
					return {
						...prevState,
						[res]: imageData,
					};
				});
			};
		});
	}, [blockInfos]);

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

			blockInfos.forEach((res: BlockStateInfosProps) => {
				ctx.drawImage(
					loadingImageInfo[res.imageInfo.source],
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
	}, [point, width, height, blockInfos, loadingImageInfo]);

	return <Styled.Block ref={canvasRef} width={width} height={height} />;
};

export default Block;
