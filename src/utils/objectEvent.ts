import { BlockStateInfosProps } from 'components/objects/Block/blockSlice';

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
	objects: Array<BlockStateInfosProps>;
}) => {
	let result = {} as BlockStateInfosProps;
	objects.some((object: BlockStateInfosProps) => {
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

export const isClamp = ({ point, mapSize }: ClampParams) => {
	return (
		point.x >= mapSize.width ||
		point.x < 0 ||
		point.y >= mapSize.height ||
		point.y < 0
	);
};

export interface SelfObjectParams {
	point: { x: number; y: number };
	size: { width: number; height: number };
}

export interface ClampParams {
	point: SelfObjectParams['point'];
	mapSize: { width: number; height: number };
}
