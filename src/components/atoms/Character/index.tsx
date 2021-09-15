import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	moveRight,
	moveLeft,
	moveDown,
	moveUp,
	setPositon,
	selectPositon,
} from './characterSlice';
import { drawImage } from 'utils/canvas';

const Styled = {
	Character: styled.canvas`
		width: 100%;
		height: 100%;
	`,
};

export interface CharacterProps {}

const Character = (props: CharacterProps): JSX.Element => {
	const characterRef = useRef(null);

	useEffect(() => {
		drawImage({
			ref: characterRef,
			imgSrc: require('./test-avater.png').default,
		});
		setPositon({ x: 0, y: 0 });
	}, []);

	const position = useAppSelector(selectPositon);
	const dispatch = useAppDispatch();

	return <Styled.Character ref={characterRef} />;
};

export default Character;
