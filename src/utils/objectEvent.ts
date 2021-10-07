export const objectPositionCheck = ({ position, size }: ObjectParams) => {
	return {
		x1: position.x,
		y1: position.y,
		x2: position.x + size.width,
		y2: position.y,
		x3: position.x,
		y3: position.y + size.height,
		x4: position.x + size.width,
		y4: position.y + size.height,
	};
};

export const isCollision = ({ self, objects }: CollisionParams) => {
	// console.log('self : ', self);
	// console.log('objects[0] : ', objects[0]);
	const result = objects.some((object: ObjectParams) => {
		const selfPosition = objectPositionCheck(self);
		const objectPosition = objectPositionCheck(object);
		const objectCheck =
			objectPosition.x1 > selfPosition.x4 ||
			objectPosition.y1 > selfPosition.y4;
		const selfCheck =
			selfPosition.x1 > objectPosition.x4 ||
			selfPosition.y1 > objectPosition.y4;

		return (objectCheck || selfCheck) === false;
	});
	return result;
};

export const isClamp = ({ position, mapSize }: ClampParams) => {
	if (
		position.x <= mapSize.width &&
		position.x >= 0 &&
		position.y < mapSize.height &&
		position.y >= 0
	) {
		return true;
	}
	return false;
};

export interface ObjectParams {
	position: { x: number; y: number };
	size: { width: number; height: number };
}

export interface CollisionParams {
	self: ObjectParams;
	objects: Array<ObjectParams>;
}

export interface ClampParams {
	position: ObjectParams['position'];
	mapSize: { width: number; height: number };
}
