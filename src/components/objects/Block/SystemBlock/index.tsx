import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	selectSystemBlockInfos,
	addBlockInfo,
	removeBlockInfo,
	selectBlockInfos,
	selectTileInfos,
	BlockStateInfoProps,
	BlockDirectionProps,
} from 'components/objects/Block/blockSlice';
import { selectPosition } from 'components/objects/Character/characterSlice';
import {
	selectSelectBuildBlockInfo,
	setSelectBuildBlockInfo,
} from 'components/ui/molecules/BuildMenu/buildMenuSlice';
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

const blockDirections: Array<BlockDirectionProps> = [
	'up',
	'left',
	'right',
	'down',
];

const SystemBlock = ({ width, height }: SystemBlockProps): JSX.Element => {
	const canvasRef = useRef(null);
	const [loadingImageInfo, setLoadingImageInfo] = useState({});
	const [mousePoint, setMousePoint] = useState({ x: 0, y: 0 });
	const [shiftKeyPressMousePointStart, setShiftKeyPressMousePointStart] =
		useState({ x: 0, y: 0 });
	const [selectShiftKeyPressBlockInfos, setSelectShiftKeyPressBlockInfos] =
		useState<Array<BlockStateInfoProps>>([]);

	const [mouseBlockPoint, setMouseBlockPoint] = useState({ x: 0, y: 0 });
	const [isShiftKeyPress, setIsShiftKeyPress] = useState(false);

	const selectBuildBlockInfo = useAppSelector(selectSelectBuildBlockInfo);
	const systemBlockInfos = useAppSelector(selectSystemBlockInfos);
	const blockInfos = useAppSelector(selectBlockInfos);
	const tileInfos = useAppSelector(selectTileInfos);
	// const blockInfos = useAppSelector(selectBlockInfos);
	const point = useAppSelector(selectPosition);
	const scale = useAppSelector(selectScale);

	const dispatch = useAppDispatch();

	const handleKeyPress = useCallback(
		(e: KeyboardEvent) => {
			switch (e.code) {
				case 'KeyR':
					if (selectBuildBlockInfo) {
						let matchDirectionIndex = 0;
						blockDirections.some((res, i) => {
							matchDirectionIndex = i;
							return res === selectBuildBlockInfo.direction;
						});

						dispatch(
							setSelectBuildBlockInfo({
								...selectBuildBlockInfo,
								direction: blockDirections[
									matchDirectionIndex + 1
								]
									? blockDirections[matchDirectionIndex + 1]
									: 'up',
							}),
						);
					}

					break;
				case 'KeyT':
					if (e.shiftKey) {
						setIsShiftKeyPress(true);
					}
					break;
				default:
					break;
			}
		},
		[selectBuildBlockInfo, dispatch],
	);

	const handleKeyUp = (e: MouseEvent) => {
		setIsShiftKeyPress(false);
		setShiftKeyPressMousePointStart({ x: 0, y: 0 });
	};

	useEffect(() => {
		window.addEventListener('keypress', handleKeyPress);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyUp);
			window.removeEventListener('keyup', handleKeyPress);
		};
	}, [handleKeyPress]);

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

	const handleCanvasMouseMove = useCallback(
		e => {
			const { offsetX, offsetY } = e;
			const inCanvasMousePoint = { x: offsetX, y: offsetY };
			if (
				isShiftKeyPress &&
				shiftKeyPressMousePointStart.x === 0 &&
				shiftKeyPressMousePointStart.y === 0
			) {
				setShiftKeyPressMousePointStart(inCanvasMousePoint);
			}
			setMousePoint(inCanvasMousePoint);
		},
		[isShiftKeyPress, shiftKeyPressMousePointStart],
	);

	const handleCanvasMouseUp = useCallback(() => {
		console.log(
			'selectShiftKeyPressBlockInfos : ',
			selectShiftKeyPressBlockInfos,
		);
		const isSpawn = systemBlockInfos.some(
			res =>
				res.key === 'spawn_point' &&
				res.point.x === mouseBlockPoint.x &&
				res.point.y === mouseBlockPoint.y,
		);
		if (selectBuildBlockInfo && !isSpawn) {
			if (selectBuildBlockInfo.type === 'block') {
				let matchIndex = 0;
				const isMatchBlock = blockInfos.some((res, i) => {
					matchIndex = i;
					return (
						res.point.x === mouseBlockPoint.x &&
						res.point.y === mouseBlockPoint.y
					);
				});
				if (isMatchBlock) {
					dispatch(removeBlockInfo(blockInfos[matchIndex]));
				}
			} else if (selectBuildBlockInfo.type === 'tile') {
				let matchIndex = 0;
				const isMatchBlock = tileInfos.some((res, i) => {
					matchIndex = i;
					return (
						res.point.x === mouseBlockPoint.x &&
						res.point.y === mouseBlockPoint.y
					);
				});

				if (isMatchBlock) {
					dispatch(removeBlockInfo(tileInfos[matchIndex]));
				}
			}
			dispatch(
				addBlockInfo({
					...selectBuildBlockInfo,
					key: moment().format('YYMMDDHHmmss'),
					point: mouseBlockPoint,
				}),
			);
			setShiftKeyPressMousePointStart({ x: 0, y: 0 });
		}
	}, [
		mouseBlockPoint,
		selectBuildBlockInfo,
		dispatch,
		systemBlockInfos,
		blockInfos,
		tileInfos,
		selectShiftKeyPressBlockInfos,
	]);

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
					const formatShiftKeyMouseBlockPointX =
						shiftKeyPressMousePointStart.x -
						(canvas.width / 2 - point.x);
					const formatShiftKeyMouseBlockPointY =
						shiftKeyPressMousePointStart.y -
						(canvas.height / 2 - point.y);
					const formatMouseBlockPointX =
						mousePoint.x - (canvas.width / 2 - point.x);
					const formatMouseBlockPointY =
						mousePoint.y - (canvas.height / 2 - point.y);

					const spawnColor = '#d61313a8';
					const selectBlockColor = '#64ef6480';
					const systemColor = '#fbace67a';

					let shiftKeyPressSelectBlockInfos = [];

					systemBlockInfos.forEach((res: BlockStateInfoProps) => {
						const { point, size, key } = res;
						const { x, y } = point;
						const formatX = x * scale;
						const formatY = y * scale;
						const formatWidth = size.width * scale;
						const formatHeight = size.height * scale;

						if (
							formatX + formatWidth > formatMouseBlockPointX &&
							formatX < formatMouseBlockPointX &&
							formatY + formatHeight > formatMouseBlockPointY &&
							formatY < formatMouseBlockPointY &&
							selectBuildBlockInfo
						) {
							// const isBlockOrObject = blockInfos.some(
							// 	res =>
							// 		res.point.x === point.x &&
							// 		res.point.y === point.y &&
							// 		(res.type === 'block' || res.type === 'object'),
							// );
							if (key === 'spawn_point') {
								ctx.fillStyle = spawnColor;
							} else {
								ctx.fillStyle = selectBlockColor;
							}
							setMouseBlockPoint(point);
						} else {
							ctx.fillStyle = systemColor;
						}

						if (isShiftKeyPress) {
							const selectMinMax = (number1, number2) =>
								number1 > number2
									? { max: number1, min: number2 }
									: { max: number2, min: number1 };
							const selectFormatX = selectMinMax(
								formatShiftKeyMouseBlockPointX,
								formatMouseBlockPointX,
							);
							const selectFormatY = selectMinMax(
								formatShiftKeyMouseBlockPointY,
								formatMouseBlockPointY,
							);

							if (
								formatX >= selectFormatX.min &&
								formatX <= selectFormatX.max &&
								formatY >= selectFormatY.min &&
								formatY <= selectFormatY.max
							) {
								if (key !== 'spawn_point') {
									shiftKeyPressSelectBlockInfos.push(res);
									ctx.fillStyle = selectBlockColor;
								} else {
									ctx.fillStyle = spawnColor;
								}
							}
						}

						ctx.fillRect(
							x * scale,
							y * scale,
							size.width * scale,
							size.height * scale,
						);
					});
					setSelectShiftKeyPressBlockInfos(
						shiftKeyPressSelectBlockInfos,
					);
				},
			});

			if (
				loadingImageInfo[
					selectBuildBlockInfo?.imageInfo?.sources[scale]
				] &&
				selectBuildBlockInfo
			) {
				ctx.drawImage(
					loadingImageInfo[
						selectBuildBlockInfo.imageInfo.sources[scale]
					],
					selectBuildBlockInfo.imageInfo[
						selectBuildBlockInfo.direction
					].sx * scale,
					selectBuildBlockInfo.imageInfo[
						selectBuildBlockInfo.direction
					].sy * scale,
					selectBuildBlockInfo.size.width * scale,
					selectBuildBlockInfo.size.height * scale,
					mousePoint.x - 12,
					mousePoint.y - 12,
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
		handleCanvasMouseMove,
		scale,
		isShiftKeyPress,
		shiftKeyPressMousePointStart,
	]);

	return <Styled.Canvas ref={canvasRef} width={width} height={height} />;
};

export default SystemBlock;
