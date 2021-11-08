import styled from 'styled-components';

export default styled.div<TileCutImageProps>`
	background-image: ${({ src }) => `url(${src})`};
	background-position: ${({ sx, sy }) => `-${sx}px -${sy}px`};
	background-repeat: no-repeat;
	width: ${({ width }) => (Number(width) ? `${width}px` : width)};
	height: ${({ height }) => (Number(height) ? `${height}px` : height)};
`;

export interface TileCutImageProps {
	src: string;
	sx: number;
	sy: number;
	width: number | string;
	height: number | string;
}
