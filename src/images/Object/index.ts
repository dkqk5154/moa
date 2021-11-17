const defaultSize = 16;
const defaultSource = require('./image.png').default;

const infos = [
	{
		name: 'WoodObject',
		source: defaultSource,
		width: defaultSize,
		height: defaultSize,
		up: {
			sx: defaultSize * 0,
			sy: defaultSize * 3,
		},
		right: {
			sx: defaultSize * 0,
			sy: defaultSize * 0,
		},
		left: {
			sx: defaultSize * 0,
			sy: defaultSize * 1,
		},
		down: {
			sx: defaultSize * 0,
			sy: defaultSize * 3,
		},
	},
];

export interface ObjectSourceProps {
	name: string;
	source: string;
	width: number;
	height: number;
	up: {
		sx: number;
		sy: number;
	};
	right: {
		sx: number;
		sy: number;
	};
	left: {
		sx: number;
		sy: number;
	};
	down: {
		sx: number;
		sy: number;
	};
}

export default infos;
