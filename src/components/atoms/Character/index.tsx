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
} from 'components/atoms/Character/characterSlice';
import { selectBlockInfos } from 'components/atoms/Block/blockSlice';
import { selectStatus } from 'components/molecules/GlobalSidebar/globalSidebarSlice';
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
			let movePosition = { x: 0, y: 0 };
			const commonFunction = (movePosition: { x: number; y: number }) => {
				const objectInfo = {
					point: movePosition,
					size,
				};
				const isObjectCollision = isCollision({
					self: objectInfo,
					objects: blockInfos,
				});
				const isObjectClamp = isClamp({
					point: objectInfo['point'],
					mapSize,
				});
				if (!isObjectCollision && isObjectClamp) {
					setAnimationFrame((prevState: number) =>
						prevState >= 2 ? 1 : prevState + 1,
					);
					dispatch(setPosition(movePosition));
				}
			};
			const objectSetPosition = () => {
				switch (direction) {
					case 'up':
						movePosition = {
							x: point.x,
							y: point.y - speed,
						};
						commonFunction(movePosition);
						break;
					case 'down':
						movePosition = {
							x: point.x,
							y: point.y + speed,
						};
						commonFunction(movePosition);
						break;
					case 'left':
						movePosition = {
							x: point.x - speed,
							y: point.y,
						};
						commonFunction(movePosition);
						break;
					case 'right':
						movePosition = {
							x: point.x + speed,
							y: point.y,
						};
						commonFunction(movePosition);
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
						imageInfo[direction].sx + animationFrame * size.width,
						imageInfo[direction].sy,
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
		window.addEventListener('keypress', handleKeyPress);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keypress', handleKeyPress);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [handleKeyUp, handleKeyPress]);

	return <Styled.Character ref={canvasRef} width={width} height={height} />;
};

export default Character;
