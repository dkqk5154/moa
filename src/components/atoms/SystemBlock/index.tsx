import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import {
	selectSystemBlockInfos,
	BlockStateInfosProps,
} from 'components/atoms/Block/blockSlice';
import { selectPosition } from 'components/atoms/Character/characterSlice';
import { selectSelectBuildBlockInfo } from 'components/atoms/BuildMenu/buildMenuSlice';

const Styled = {
	Canvas: styled.canvas`
		position: absolute;
		z-index: 100;
		top: 0;
	`,
};

export interface SystemBlockProps {
	width: number;
	height: number;
}

const SystemBlock = ({ width, height }: SystemBlockProps): JSX.Element => {
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});
	const [mouseBlockPoint, setMouseBlockPoint] = useState({ x: 0, y: 0 });

	const selectBuildBlockInfo = useAppSelector(selectSelectBuildBlockInfo);
	const blockInfos = useAppSelector(selectSystemBlockInfos);
	const position = useAppSelector(selectPosition);

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

	const handleCanvasMouseMove = props => {
		setMouseBlockPoint({ x: props.offsetX, y: props.offsetY });
	};

	useEffect(() => {
		const canvas = canvasRef?.current;
		if (canvas && Object.keys(loadingImageInfo).length) {
			const ctx = canvas.getContext('2d');

			canvas.addEventListener('mousemove', handleCanvasMouseMove);

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();
			ctx.translate(
				canvas.width / 2 - position.x,
				canvas.height / 2 - position.y,
			);

			const formatMouseBlockPointX =
				mouseBlockPoint.x - (canvas.width / 2 - position.x);
			const formatMouseBlockPointY =
				mouseBlockPoint.y - (canvas.height / 2 - position.y);

			blockInfos.forEach(({ position, size }: BlockStateInfosProps) => {
				const { x, y } = position;

				if (
					x + size.width > formatMouseBlockPointX &&
					x < formatMouseBlockPointX &&
					y + size.height > formatMouseBlockPointY &&
					y < formatMouseBlockPointY &&
					selectBuildBlockInfo
				) {
					// console.log(
					// 	'match',
					// 	mouseBlockPoint.x,
					// 	mouseBlockPoint.y,
					// 	x,
					// 	y,
					// );
					ctx.fillStyle = '#64ef6480';
				} else {
					ctx.fillStyle = '#fbace67a';
				}
				ctx.fillRect(x, y, 48, 48);
			});

			ctx.restore();

			if (selectBuildBlockInfo) {
				ctx.drawImage(
					loadingImageInfo[selectBuildBlockInfo.imageInfo.source],
					selectBuildBlockInfo.imageInfo.up.sx,
					selectBuildBlockInfo.imageInfo.up.sy,
					selectBuildBlockInfo.size.width,
					selectBuildBlockInfo.size.height,
					mouseBlockPoint.x - 12,
					mouseBlockPoint.y - 12,
					selectBuildBlockInfo.size.width,
					selectBuildBlockInfo.size.height,
				);
			}
		}
		return () => {
			canvas.removeEventListener('mousemove', handleCanvasMouseMove);
		};
	}, [
		position,
		width,
		height,
		blockInfos,
		loadingImageInfo,
		mouseBlockPoint,
		selectBuildBlockInfo,
	]);

	return <Styled.Canvas ref={canvasRef} width={width} height={height} />;
};

export default SystemBlock;
