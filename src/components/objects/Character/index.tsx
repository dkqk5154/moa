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
import { selectStatus } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import useInterval from 'hooks/useInterval';

import { isCollision, isClamp } from 'utils/objectEvent';

const Styled = {
	Character: styled.canvas`
		position: absolute;
		top: 0;
	`,
};

export interface CharacterProps {
	width: number;
	height: number;
	mapSize: { width: number; height: number };
}

const Character = ({ width, height, mapSize }: CharacterProps): JSX.Element => {
	const [isKeyPress, setIsKeyPress] = useState(false);
	const [pushKeyArray, setPushKeyArray] = useState([]);
	const [animationFrame, setAnimationFrame] = useState(0);

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

	const canvasRef = useRef(null);

	const speed = useMemo(
		() => (status === 'build' ? 200 : reduceSpeed),
		[status, reduceSpeed],
	);

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
					mapSize,
				});

				const isMove =
					status === 'build'
						? true
						: !isCharacterCollision && !isObjectClamp;

				if (isMove) {
					setAnimationFrame((prevState: number) =>
						prevState >= 2 ? 1 : prevState + 1,
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

	useEffect(() => {
		if (canvasRef) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			const playerImage = new Image();
			playerImage.src = imageInfo.source;
			playerImage.onload = () => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.save();
				ctx.translate(
					canvas.width / 2 - point.x,
					canvas.height / 2 - point.y,
				);
				if (status !== 'build') {
					ctx.drawImage(
						playerImage,
						imageInfo[direction].sx,
						imageInfo[direction].sy + animationFrame * size.height,
						size.width,
						size.height,
						point.x,
						point.y,
						size.width,
						size.height,
					);
				}

				ctx.restore();
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
	]);

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
