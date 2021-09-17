import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	moveRight,
	moveLeft,
	moveDown,
	moveUp,
	selectDelay,
	selectPosition,
} from './characterSlice';
import { selectInfos } from 'components/atoms/Block/blockSlice';
import { draw } from 'utils/canvas';
import useInterval from 'hooks/useInterval';

import TestUser from 'images/TestUser';

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
	const blockInfos = useAppSelector(selectInfos);
	const delay = useAppSelector(selectDelay);
	const dispatch = useAppDispatch();

	const canvas = useRef(null);

	useInterval(
		() => {
			const commonFunction = () => {};
			switch (direction) {
				case 'up':
					commonFunction();
					dispatch(moveUp());
					break;
				case 'left':
					commonFunction();
					dispatch(moveLeft());
					break;
				case 'down':
					commonFunction();
					dispatch(moveDown());
					break;
				case 'right':
					commonFunction();
					dispatch(moveRight());
					break;
				default:
					break;
			}
		},
		isKeyPress ? delay : null,
	);

	useEffect(() => {
		if (canvas) {
			draw({
				canvas: canvas.current,
				imageSource: TestUser.source,
				...TestUser[direction],
				sWidth: TestUser.width,
				sHeight: TestUser.height,
				...position,
				width: TestUser.width,
				height: TestUser.height,
				isClear: true,
			});
		}
	}, [position, direction, width, height]);

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
