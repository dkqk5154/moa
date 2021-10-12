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
		background-color: var(--black);
	`,
};

export interface MapProps {
	width: number;
	height: number;
}

const Map = ({ width, height }: MapProps): JSX.Element => {
	const tileInfos = useAppSelector(selectTileInfos);
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});
	// const dispatch = useAppDispatch();

	const point = useAppSelector(selectPosition);

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
				canvas.width / 2 - point.x,
				canvas.height / 2 - point.y,
			);

			tileInfos.forEach((res: BlockStateInfosProps) => {
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
	}, [point, width, height, tileInfos, loadingImageInfo]);

	return <Styled.Tile ref={canvasRef} width={width} height={height} />;
};

export default Map;
