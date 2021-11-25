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
	addBlockInfos,
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

	const handleKeyDown = useCallback(
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
					if (e.shiftKey && !e.repeat) {
						console.log('on shift');
						setIsShiftKeyPress(true);
					}
					break;
				default:
					break;
			}
		},
		[dispatch, selectBuildBlockInfo],
	);

	const handleKeyUp = (e: KeyboardEvent) => {
		setIsShiftKeyPress(false);
		setShiftKeyPressMousePointStart({ x: 0, y: 0 });
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyDown]);

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

	const filterMatchBlock = ({
		blockInfos,
		mouseBlockPoint,
	}: {
		blockInfos: Array<BlockStateInfoProps>;
		mouseBlockPoint: { x: number; y: number };
	}) => {
		let result = null;
		blockInfos.some((res, i) => {
			if (
				res.point.x === mouseBlockPoint.x &&
				res.point.y === mouseBlockPoint.y
			) {
				result = blockInfos[i];
				return true;
			}
			return false;
		});
		return result;
	};

	const duplicationRemoveBlock = useCallback(
		({
			selectBlockInfo,
			mouseBlockPoint,
		}: {
			selectBlockInfo: BlockStateInfoProps;
			mouseBlockPoint: { x: number; y: number };
		}) => {
			let selectRemoveBlockInfo = null as BlockStateInfoProps;
			if (selectBlockInfo.type === 'block') {
				selectRemoveBlockInfo = filterMatchBlock({
					blockInfos,
					mouseBlockPoint,
				});
			} else if (selectBlockInfo.type === 'tile') {
				selectRemoveBlockInfo = filterMatchBlock({
					blockInfos: tileInfos,
					mouseBlockPoint,
				});
			}
			return selectRemoveBlockInfo;
		},
		[blockInfos, tileInfos],
	);

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

	const handleCanvasMouseUp = useCallback(
		({ offsetX, offsetY }: MouseEvent) => {
			const isSpawn = systemBlockInfos.some(
				res =>
					res.key === 'spawn_point' &&
					res.point.x === mouseBlockPoint.x &&
					res.point.y === mouseBlockPoint.y,
			);
			if (selectBuildBlockInfo && !isSpawn && !isShiftKeyPress) {
				let selectRemoveBlockInfo = {} as BlockStateInfoProps;
				selectRemoveBlockInfo = duplicationRemoveBlock({
					selectBlockInfo: selectBuildBlockInfo,
					mouseBlockPoint: mouseBlockPoint,
				});
				if (selectRemoveBlockInfo) {
					dispatch(removeBlockInfo(selectRemoveBlockInfo));
				}
				dispatch(
					addBlockInfo({
						...selectBuildBlockInfo,
						key: moment().format('x'),
						point: mouseBlockPoint,
					}),
				);
			} else if (isShiftKeyPress) {
				console.log('isShiftKeyPress : ', true);
				let result = [];
				const canvas = canvasRef?.current;
				systemBlockInfos.map(res => {
					const { point, key } = res;
					const { x, y } = point;
					const formatShiftKeyMouseBlockPointX =
						shiftKeyPressMousePointStart.x -
						(canvas.width / 2 - point.x);
					const formatShiftKeyMouseBlockPointY =
						shiftKeyPressMousePointStart.y -
						(canvas.height / 2 - point.y);
					const formatMouseBlockPointX =
						offsetX - (canvas.width / 2 - point.x);
					const formatMouseBlockPointY =
						offsetY - (canvas.height / 2 - point.y);

					const selectFormatX = selectMinMax(
						formatShiftKeyMouseBlockPointX,
						formatMouseBlockPointX,
					);
					const selectFormatY = selectMinMax(
						formatShiftKeyMouseBlockPointY,
						formatMouseBlockPointY,
					);
					const formatX = x * scale;
					const formatY = y * scale;
					if (
						formatX >= selectFormatX.min &&
						formatX <= selectFormatX.max &&
						formatY >= selectFormatY.min &&
						formatY <= selectFormatY.max
					) {
						if (key !== 'spawn_point') {
							result.push({ point, key: moment().format('x') });
						}
					}
					return res;
				});
				result = result.map(res => {
					return { ...selectBuildBlockInfo, ...res };
				});
				console.log('selectBuildBlockInfo : ', selectBuildBlockInfo);
				console.log('result : ', result);
				dispatch(addBlockInfos(result));
				setIsShiftKeyPress(false);
			}
			setShiftKeyPressMousePointStart({ x: 0, y: 0 });
		},
		[
			mouseBlockPoint,
			selectBuildBlockInfo,
			dispatch,
			systemBlockInfos,
			isShiftKeyPress,
			duplicationRemoveBlock,
			scale,
			shiftKeyPressMousePointStart,
		],
	);

	const selectMinMax = (number1, number2) =>
		number1 > number2
			? { max: number1, min: number2 }
			: { max: number2, min: number1 };

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
