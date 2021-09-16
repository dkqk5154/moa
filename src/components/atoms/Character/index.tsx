import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	moveRight,
	moveLeft,
	moveDown,
	moveUp,
	// setPosition,
	selectDelay,
	selectPosition,
} from './characterSlice';
import { draw } from 'utils/canvas';
import useInterval from 'hooks/useInterval';

import TestUser from 'images/TestUser';

const Styled = {
	Character: styled.canvas`
		border: 1px solid #ffffff;
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
	const characterRef = useRef(null);

	const position = useAppSelector(selectPosition);
	const delay = useAppSelector(selectDelay);
	const dispatch = useAppDispatch();

	useInterval(
		() => {
			switch (direction) {
				case 'up':
					dispatch(moveUp());
					break;
				case 'left':
					dispatch(moveLeft());
					break;
				case 'down':
					dispatch(moveDown());
					break;
				case 'right':
					dispatch(moveRight());
					break;
				default:
					break;
			}
		},
		isKeyPress ? delay : null,
	);

	useEffect(() => {
		draw({
			canvas: characterRef.current,
			image: TestUser.source,
			...TestUser[direction],
			sWidth: 64,
			sHeight: 64,
			...position,
			width: TestUser.width,
			height: TestUser.height,
		});
	}, [position, direction, width, height]);

	const handleKeyPress = (e: KeyboardEvent) => {
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
	};

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
	}, [handleKeyUp]);

	return (
		<Styled.Character ref={characterRef} width={width} height={height} />
	);
};

export default Character;
