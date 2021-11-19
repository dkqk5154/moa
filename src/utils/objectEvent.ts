import { BlockStateInfoProps } from 'components/objects/Block/blockSlice';

export const objectPositionCheck = ({ point, size }: SelfObjectParams) => {
	return {
		x1: point.x,
		y1: point.y,
		x2: point.x + size.width,
		y2: point.y,
		x3: point.x,
		y3: point.y + size.height,
		x4: point.x + size.width,
		y4: point.y + size.height,
	};
};

export const isCollision = ({
	self,
	objects,
}: {
	self: SelfObjectParams;
	objects: Array<BlockStateInfoProps>;
}) => {
	let result = null as BlockStateInfoProps;
	objects.some((object: BlockStateInfoProps) => {
		const selfPosition = objectPositionCheck(self);
		const objectPosition = objectPositionCheck(object);
		const objectCheck =
			objectPosition.x1 >= selfPosition.x4 ||
			objectPosition.y1 >= selfPosition.y4;
		const selfCheck =
			selfPosition.x1 >= objectPosition.x4 ||
			selfPosition.y1 >= objectPosition.y4;

		if ((objectCheck || selfCheck) === false) {
			result = object;
			return true;
		}
		return false;
	});
	return result;
};

export const isClamp = ({ point, mapPoint }: ClampParams) => {
	const { startX, startY, endX, endY } = mapPoint;
	return (
		point.x >= endX ||
		point.x < startX ||
		point.y >= endY ||
		point.y < startY
	);
};

export interface SelfObjectParams {
	point: { x: number; y: number };
	size: { width: number; height: number };
}

export interface ClampParams {
	point: SelfObjectParams['point'];
	mapPoint: { startX: number; endX: number; startY: number; endY: number };
}
