import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import {
	selectTileInfos,
	BlockStateInfosProps,
} from 'components/atoms/Block/blockSlice';
import { selectPosition } from 'components/atoms/Character/characterSlice';

const Styled = {
	Tile: styled.canvas`
		position: absolute;
		top: 0;
		z-index: -100;
	`,
};

export interface CharacterProps {
	width: number;
	height: number;
}

const Character = ({ width, height }: CharacterProps): JSX.Element => {
	const tileInfos = useAppSelector(selectTileInfos);
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});
	// const dispatch = useAppDispatch();

	const position = useAppSelector(selectPosition);

	useEffect(() => {
		const imageSourceInfos = Array.from(
			new Set(tileInfos.map(res => res.imageInfo.source)),
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
	}, [tileInfos]);

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

			tileInfos.forEach((res: BlockStateInfosProps) => {
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
	}, [position, width, height, tileInfos, loadingImageInfo]);

	return <Styled.Tile ref={canvasRef} width={width} height={height} />;
};

export default Character;
