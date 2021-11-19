import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	selectSystemBlockInfos,
	addBlockInfo,
	// selectBlockInfos,
	BlockStateInfoProps,
} from 'components/objects/Block/blockSlice';
import { selectPosition } from 'components/objects/Character/characterSlice';
import { selectSelectBuildBlockInfo } from 'components/ui/molecules/BuildMenu/buildMenuSlice';
import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import { drawCanvasCamera, loadingCanvasImageInfo } from 'utils/canvas';

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
	const point = useAppSelector(selectPosition);
	const scale = useAppSelector(selectScale);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (selectBuildBlockInfo) {
			const loadingCanvasImage = async () => {
				const imageInfos = await loadingCanvasImageInfo({
					blockInfos: [selectBuildBlockInfo],
					scale: scale,
				});
				setLoadingImageInfo(prevState => {
					return { ...imageInfos, ...prevState };
				});
			};
			loadingCanvasImage();
		}
	}, [systemBlockInfos, selectBuildBlockInfo, scale]);

	const handleCanvasMouseMove = ({ offsetX, offsetY }) => {
		setMousePoint({ x: offsetX, y: offsetY });
	};

	const handleCanvasMouseUp = useCallback(() => {
		const isSpawn = systemBlockInfos.some(
			res =>
				res.key === 'spawn_point' &&
				res.point.x === mouseBlockPoint.x &&
				res.point.y === mouseBlockPoint.y,
		);
		if (selectBuildBlockInfo && !isSpawn) {
			dispatch(
				addBlockInfo({
					...selectBuildBlockInfo,
					point: mouseBlockPoint,
				}),
			);
		}
	}, [mouseBlockPoint, selectBuildBlockInfo, dispatch, systemBlockInfos]);

	useEffect(() => {
		const canvas = canvasRef?.current;
		if (canvas) {
			const ctx = canvas.getContext('2d');
			canvas.addEventListener('mousemove', handleCanvasMouseMove);
			canvas.addEventListener('mouseup', handleCanvasMouseUp);

			drawCanvasCamera({
				canvas,
				ctx,
				point,
				callback: () => {
					const formatMouseBlockPointX =
						mousePoint.x - (canvas.width / 2 - point.x);
					const formatMouseBlockPointY =
						mousePoint.y - (canvas.height / 2 - point.y);

					systemBlockInfos.forEach(
						({ point, size, key }: BlockStateInfoProps) => {
							const { x, y } = point;
							if (
								x + size.width > formatMouseBlockPointX &&
								x < formatMouseBlockPointX &&
								y + size.height > formatMouseBlockPointY &&
								y < formatMouseBlockPointY &&
								selectBuildBlockInfo
							) {
								// const isBlockOrObject = blockInfos.some(
								// 	res =>
								// 		res.point.x === point.x &&
								// 		res.point.y === point.y &&
								// 		(res.type === 'block' || res.type === 'object'),
								// );
								if (key === 'spawn_point') {
									ctx.fillStyle = '#d61313a8';
								} else {
									ctx.fillStyle = '#64ef6480';
								}
								setMouseBlockPoint(point);
								// ctx.fillStyle = '#64ef6480';
							} else {
								ctx.fillStyle = '#fbace67a';
							}
							ctx.fillRect(
								x * scale,
								y * scale,
								size.width * scale,
								size.height * scale,
							);
						},
					);
				},
			});

			if (
				loadingImageInfo[
					selectBuildBlockInfo?.imageInfo?.sources[scale]
				]
			) {
				ctx.drawImage(
					loadingImageInfo[
						selectBuildBlockInfo.imageInfo.sources[scale]
					],
					selectBuildBlockInfo.imageInfo.up.sx * scale,
					selectBuildBlockInfo.imageInfo.up.sy * scale,
					selectBuildBlockInfo.size.width * scale,
					selectBuildBlockInfo.size.height * scale,
					mousePoint.x - 12 * scale,
					mousePoint.y - 12 * scale,
					selectBuildBlockInfo.size.width * scale,
					selectBuildBlockInfo.size.height * scale,
				);
			}
		}
		return () => {
			canvas.removeEventListener('mousemove', handleCanvasMouseMove);
			canvas.removeEventListener('mouseup', handleCanvasMouseUp);
		};
	}, [
		point,
		width,
		height,
		systemBlockInfos,
		loadingImageInfo,
		mousePoint,
		selectBuildBlockInfo,
		dispatch,
		handleCanvasMouseUp,
		scale,
	]);

	return <Styled.Canvas ref={canvasRef} width={width} height={height} />;
};

export default SystemBlock;
