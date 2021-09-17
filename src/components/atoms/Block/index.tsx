import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import {
	useAppSelector,
	// useAppDispatch
} from 'app/hooks';
import { selectInfos, BlockStateInfosProps } from './blockSlice';
import { draw } from 'utils/canvas';

import TestBlock from 'images/TestBlock';

const Styled = {
	Block: styled.canvas`
		position: absolute;
		top: 0;
	`,
};

export interface CharacterProps {
	width: number;
	height: number;
}

const Character = ({ width, height }: CharacterProps): JSX.Element => {
	const blockInfos = useAppSelector(selectInfos);
	const canvas = useRef(null);
	// const dispatch = useAppDispatch();

	useEffect(() => {
		if (canvas) {
			console.log('blockInfos : ', blockInfos);
			blockInfos.map((res: BlockStateInfosProps) => {
				draw({
					canvas: canvas.current,
					imageSource: res.imageInfo.source,
					...res.imageInfo,
					sWidth: res.imageInfo.width,
					sHeight: res.imageInfo.height,
					x: res.x,
					y: res.y,
				});
				return res;
			});
		}
	}, [canvas, width, height, blockInfos]);

	return <Styled.Block ref={canvas} width={width} height={height} />;
};

export default Character;
