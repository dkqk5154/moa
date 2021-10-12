import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	selectSystemBlockInfos,
	addBlockInfo,
	// selectBlockInfos,
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
	const [mousePoint, setMousePoint] = useState({ x: 0, y: 0 });
	const [mouseBlockPoint, setMouseBlockPoint] = useState({ x: 0, y: 0 });

	const selectBuildBlockInfo = useAppSelector(selectSelectBuildBlockInfo);
	const systemBlockInfos = useAppSelector(selectSystemBlockInfos);
	// const blockInfos = useAppSelector(selectBlockInfos);
	const position = useAppSelector(selectPosition);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const imageSourceInfos = Array.from(
			new Set(
				systemBlockInfos.map(
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
	}, [systemBlockInfos]);

	const handleCanvasMouseMove = ({ offsetX, offsetY }) => {
		setMousePoint({ x: offsetX, y: offsetY });
	};

	const handleCanvasMouseUp = useCallback(() => {
		const isSpawn = systemBlockInfos.some(
			res =>
				res.key === 'spawn_point' &&
				res.position.x === mouseBlockPoint.x &&
				res.position.y === mouseBlockPoint.y,
		);
		console.log('isSpawn : ', isSpawn);
		if (selectBuildBlockInfo && !isSpawn) {
			dispatch(
				addBlockInfo({
					...selectBuildBlockInfo,
					position: mouseBlockPoint,
				}),
			);
		}
	}, [mouseBlockPoint, selectBuildBlockInfo, dispatch, systemBlockInfos]);

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
				mousePoint.x - (canvas.width / 2 - position.x);
			const formatMouseBlockPointY =
				mousePoint.y - (canvas.height / 2 - position.y);

			canvas.addEventListener('mouseup', handleCanvasMouseUp);

			systemBlockInfos.forEach(
				({ position, size, key }: BlockStateInfosProps) => {
					const { x, y } = position;

					if (
						x + size.width > formatMouseBlockPointX &&
						x < formatMouseBlockPointX &&
						y + size.height > formatMouseBlockPointY &&
						y < formatMouseBlockPointY &&
						selectBuildBlockInfo
					) {
						// const isBlockOrObject = blockInfos.some(
						// 	res =>
						// 		res.position.x === position.x &&
						// 		res.position.y === position.y &&
						// 		(res.type === 'block' || res.type === 'object'),
						// );
						if (key === 'spawn_point') {
							ctx.fillStyle = '#d61313a8';
						} else {
							ctx.fillStyle = '#64ef6480';
						}
						setMouseBlockPoint(position);
						// ctx.fillStyle = '#64ef6480';
					} else {
						ctx.fillStyle = '#fbace67a';
					}
					ctx.fillRect(x, y, 48, 48);
				},
			);

			ctx.restore();

			if (selectBuildBlockInfo) {
				ctx.drawImage(
					loadingImageInfo[selectBuildBlockInfo.imageInfo.source],
					selectBuildBlockInfo.imageInfo.up.sx,
					selectBuildBlockInfo.imageInfo.up.sy,
					selectBuildBlockInfo.size.width,
					selectBuildBlockInfo.size.height,
					mousePoint.x - 12,
					mousePoint.y - 12,
					selectBuildBlockInfo.size.width,
					selectBuildBlockInfo.size.height,
				);
			}
		}
		return () => {
			canvas.removeEventListener('mousemove', handleCanvasMouseMove);
			canvas.removeEventListener('mouseup', handleCanvasMouseUp);
		};
	}, [
		position,
		width,
		height,
		systemBlockInfos,
		loadingImageInfo,
		mousePoint,
		selectBuildBlockInfo,
		dispatch,
		handleCanvasMouseUp,
	]);

	return <Styled.Canvas ref={canvasRef} width={width} height={height} />;
};

export default SystemBlock;
