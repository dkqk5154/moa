import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	selectDelay,
	selectPosition,
	selectSpeed,
	selectSize,
	selectImageInfo,
	setPosition,
} from './characterSlice';
import { selectBlockInfos } from 'components/atoms/Block/blockSlice';
import { draw } from 'utils/canvas';
import useInterval from 'hooks/useInterval';

import { isCollision } from 'utils/objectEvent';

const Styled = {
	Character: styled.canvas`
		display: absolute;
		top: 0;
	`,
};

export interface CharacterProps {
	width: number;
	height: number;
}

const Character = ({ width, height }: CharacterProps): JSX.Element => {
	const [direction, setDirection] = useState('down');
	const [isKeyPress, setIsKeyPress] = useState(false);
	const [pushKeyArray, setPushKeyArray] = useState([]);

	const position = useAppSelector(selectPosition);
	const speed = useAppSelector(selectSpeed);
	const blockInfos = useAppSelector(selectBlockInfos);
	const delay = useAppSelector(selectDelay);
	const size = useAppSelector(selectSize);
	const imageInfo = useAppSelector(selectImageInfo);
	const dispatch = useAppDispatch();

	const canvas = useRef(null);

	useInterval(
		() => {
			let movePosition = { x: 0, y: 0 };
			const commonFunction = (movePosition: { x: number; y: number }) => {
				const isObjectCollision = isCollision({
					self: {
						position: movePosition,
						size,
					},
					objects: blockInfos,
				});
				if (!isObjectCollision) {
					dispatch(setPosition(movePosition));
				}
			};
			const objectSetPosition = () => {
				switch (direction) {
					case 'up':
						movePosition = {
							x: position.x,
							y: position.y - speed,
						};
						commonFunction(movePosition);
						break;
					case 'down':
						movePosition = {
							x: position.x,
							y: position.y + speed,
						};
						commonFunction(movePosition);
						break;
					case 'left':
						movePosition = {
							x: position.x - speed,
							y: position.y,
						};
						commonFunction(movePosition);
						break;
					case 'right':
						movePosition = {
							x: position.x + speed,
							y: position.y,
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
		// console.log(
		// 	'blockInfos : ',
		// 	blockInfos.map(res => res.position),
		// );
		console.log(
			'isCollision : ',
			isCollision({
				self: {
					position,
					size,
				},
				objects: blockInfos,
			}),
		);
		// console.log('position : ', position);
	}, [position, size, blockInfos]);

	useEffect(() => {
		if (canvas) {
			draw({
				canvas: canvas.current,
				imageSource: imageInfo.source,
				...imageInfo[direction],
				sWidth: imageInfo.width,
				sHeight: imageInfo.height,
				...position,
				width: imageInfo.width,
				height: imageInfo.height,
				isClear: true,
			});
		}
	}, [imageInfo, position, direction, width, height]);

	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		const commonFunction = () => {
			setIsKeyPress(true);
			setPushKeyArray(prevState => prevState.concat(e.code));
		};
		switch (e.code) {
			case 'KeyW':
				setDirection('up');
				commonFunction();
				break;
			case 'KeyA':
				setDirection('left');
				commonFunction();
				break;
			case 'KeyS':
				setDirection('down');
				commonFunction();
				break;
			case 'KeyD':
				setDirection('right');
				commonFunction();
				break;
			default:
				break;
		}
	}, []);

	const handleKeyUp = useCallback(
		(e: KeyboardEvent) => {
			const isEmptyPushKey = pushKeyArray.filter(res => res !== e.code);
			if (isEmptyPushKey.length === 0) {
				setIsKeyPress(false);
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

	return <Styled.Character ref={canvas} width={width} height={height} />;
};

export default Character;
