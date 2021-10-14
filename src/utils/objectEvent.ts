export const objectPositionCheck = ({ point, size }: ObjectParams) => {
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

export const isCollision = ({ self, objects }: CollisionParams) => {
	// console.log('self : ', self);
	// console.log('objects[0] : ', objects[0]);
	const result = objects.some((object: ObjectParams) => {
		const selfPosition = objectPositionCheck(self);
		const objectPosition = objectPositionCheck(object);
		const objectCheck =
			objectPosition.x1 >= selfPosition.x4 ||
			objectPosition.y1 >= selfPosition.y4;
		const selfCheck =
			selfPosition.x1 >= objectPosition.x4 ||
			selfPosition.y1 >= objectPosition.y4;

		return (objectCheck || selfCheck) === false;
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

export interface ObjectParams {
	point: { x: number; y: number };
	size: { width: number; height: number };
}

export interface CollisionParams {
	self: ObjectParams;
	objects: Array<ObjectParams>;
}

export interface ClampParams {
	point: ObjectParams['point'];
	mapSize: { width: number; height: number };
}
