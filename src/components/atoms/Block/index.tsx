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
		z-index: -50;
		top: 0;
	`,
};

export interface CharacterProps {
	width: number;
	height: number;
}

const Character = ({ width, height }: CharacterProps): JSX.Element => {
	const blockInfos = useAppSelector(selectBlockInfos);
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});

	const position = useAppSelector(selectPosition);

	useEffect(() => {
		const imageSourceInfos = Array.from(
			new Set(blockInfos.map(res => res.imageInfo.source)),
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
				canvas.width / 2 - position.x,
				canvas.height / 2 - position.y,
			);

			blockInfos.forEach((res: BlockStateInfosProps) => {
				ctx.drawImage(
					loadingImageInfo[res.imageInfo.source],
					res.imageInfo.sx,
					res.imageInfo.sy,
					res.imageInfo.width,
					res.imageInfo.height,
					res.position.x,
					res.position.y,
					res.imageInfo.width,
					res.imageInfo.height,
				);
			});

			ctx.restore();
		}
	}, [position, width, height, blockInfos, loadingImageInfo]);

	return <Styled.Block ref={canvasRef} width={width} height={height} />;
};

export default Character;
