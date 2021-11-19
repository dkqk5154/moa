import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	selectDelay,
	selectPosition,
	selectSpeed,
	selectSize,
	selectImageInfo,
	selectDirection,
	setPosition,
	setDirection,
} from 'components/objects/Character/characterSlice';
import {
	selectBlockInfos,
	selectObjectBlockInfos,
} from 'components/objects/Block/blockSlice';
import { setSelectBlockInfo } from 'components/ui/organisms/GlobalPopupMenu/globalPopupMenuSlice';
import {
	selectScale,
	selectStatus,
} from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import useInterval from 'hooks/useInterval';

import { isCollision, isClamp } from 'utils/objectEvent';
import { drawCanvasCamera, scaleDrawImage } from 'utils/canvas';
import { selectMapPoint, selectMapSize } from '../Block/mapSlice';

const Styled = {
	Character: styled.canvas`
		position: absolute;
		top: 0;
	`,
};

export interface CharacterProps {
	width: number;
	height: number;
}

const Character = ({ width, height }: CharacterProps): JSX.Element => {
	const [isKeyPress, setIsKeyPress] = useState(false);
	const [pushKeyArray, setPushKeyArray] = useState([]);
	const [animationFrame, setAnimationFrame] = useState(0);
	// const [loadingImageInfo, setLoadingImageInfo] = useState({});

	const point = useAppSelector(selectPosition);
	const direction = useAppSelector(selectDirection);
	const reduceSpeed = useAppSelector(selectSpeed);
	const blockInfos = useAppSelector(selectBlockInfos);
	const objectBlockInfos = useAppSelector(selectObjectBlockInfos);
	const delay = useAppSelector(selectDelay);
	const size = useAppSelector(selectSize);
	const imageInfo = useAppSelector(selectImageInfo);
	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();
	const scale = useAppSelector(selectScale);

	const mapSize = useAppSelector(selectMapSize);
	const mapPoint = useAppSelector(selectMapPoint);

	const canvasRef = useRef(null);

	const speed = useMemo(
		() => (status === 'build' ? 200 : reduceSpeed),
		[status, reduceSpeed],
	);

	// useEffect(() => {
	// 	const loadingCanvasImage = async () => {
	// 		console.log(
	// 			'imageInfo.sources : ',
	// 			require('images/Character/image1.png'),
	// 		);
	// 		console.log('imageInfo.sources : ', imageInfo.sources);
	// 		const result = await formatLoadingImageInfos(
	// 			imageInfo.sources.map(res => String(res)),
	// 		);
	// 		console.log('result : ', result);
	// 		setLoadingImageInfo(result);
	// 	};
	// 	loadingCanvasImage();
	// }, [imageInfo, scale]);

	useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			const playerImage = new Image();
			playerImage.src = imageInfo.sources[scale];
			playerImage.onload = () => {
				drawCanvasCamera({
					canvas,
					ctx,
					point: point,
					callback: () => {
						if (status !== 'build') {
							scaleDrawImage({
								ctx,
								scale,
								loadingImageInfo: {
									[imageInfo.sources[scale]]: playerImage,
								},
								info: {
									size,
									point,
									imageInfo,
								},
								direction,
								animationFrame,
							});
						}
					},
				});
			};
		}
	}, [
		imageInfo,
		point,
		direction,
		size,
		width,
		height,
		animationFrame,
		blockInfos,
		status,
		scale,
	]);

	useInterval(
		() => {
			const commonFunction = (
				movePoint: {
					x: number;
					y: number;
				},
				frontPoint: {
					x: number;
					y: number;
				},
			) => {
				const isCharacterCollision = isCollision({
					self: { point: movePoint, size },
					objects: [...blockInfos, ...objectBlockInfos],
				});

				const selectObjectInfo = isCollision({
					self: {
						point: isCharacterCollision ? movePoint : frontPoint,
						size,
					},
					objects: [...blockInfos, ...objectBlockInfos],
				});

				dispatch(setSelectBlockInfo(selectObjectInfo));

				const isObjectClamp = isClamp({
					point: movePoint,
					mapPoint: {
						...mapPoint,
						endX: mapSize.width + mapPoint.startX,
						endY: mapSize.height + mapPoint.startY,
					},
				});

				const isMove =
					status === 'build'
						? true
						: !isCharacterCollision && !isObjectClamp;

				if (isMove) {
					setAnimationFrame((prevState: number) =>
						prevState >= imageInfo.animationFrame
							? 1
							: prevState + 1,
					);
					dispatch(setPosition(movePoint));
				}
			};
			const objectSetPosition = () => {
				switch (direction) {
					case 'up':
						commonFunction(
							{ x: point.x, y: point.y - speed },
							{ x: point.x, y: point.y - speed * 2 },
						);
						break;
					case 'down':
						commonFunction(
							{ x: point.x, y: point.y + speed },
							{ x: point.x, y: point.y + speed * 2 },
						);
						break;
					case 'left':
						commonFunction(
							{ x: point.x - speed, y: point.y },
							{ x: point.x - speed * 2, y: point.y },
						);
						break;
					case 'right':
						commonFunction(
							{ x: point.x + speed, y: point.y },
							{ x: point.x + speed * 2, y: point.y },
						);
						break;

					default:
						break;
				}
			};
			objectSetPosition();
		},
		isKeyPress ? delay : null,
	);

	const handleKeyPress = useCallback(
		(e: KeyboardEvent) => {
			const commonFunction = () => {
				setIsKeyPress(true);
				setPushKeyArray(prevState => prevState.concat(e.code));
			};
			switch (e.code) {
				case 'KeyW':
					dispatch(setDirection('up'));
					commonFunction();
					break;
				case 'KeyA':
					dispatch(setDirection('left'));
					commonFunction();
					break;
				case 'KeyS':
					dispatch(setDirection('down'));
					commonFunction();
					break;
				case 'KeyD':
					dispatch(setDirection('right'));
					commonFunction();
					break;

				case 'ArrowUp':
					dispatch(setDirection('up'));
					commonFunction();
					break;
				case 'ArrowLeft':
					dispatch(setDirection('left'));
					commonFunction();
					break;
				case 'ArrowDown':
					dispatch(setDirection('down'));
					commonFunction();
					break;
				case 'ArrowRight':
					dispatch(setDirection('right'));
					commonFunction();
					break;
				default:
					break;
			}
		},
		[dispatch],
	);

	const handleKeyUp = useCallback(
		(e: KeyboardEvent) => {
			const isEmptyPushKey = pushKeyArray.filter(res => res !== e.code);
			if (isEmptyPushKey.length === 0) {
				setIsKeyPress(false);
				setAnimationFrame(0);
			}
			setPushKeyArray(isEmptyPushKey);
		},
		[pushKeyArray],
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyPress);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyUp, handleKeyPress]);

	return <Styled.Character ref={canvasRef} width={width} height={height} />;
};

export default Character;
