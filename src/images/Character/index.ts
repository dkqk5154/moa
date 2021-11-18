const defaultSize = 32;
const scale1Source = require('./image1.png').default;
const scale2Source = require('./image2.png').default;
const scale3Source = require('./image3.png').default;

const info = {
	sources: ['', scale1Source, scale2Source, scale3Source],
	width: defaultSize,
	height: defaultSize,
	animationFrame: 7,
	up: {
		sx: 0,
		sy: defaultSize * 1,
	},
	down: {
		sx: 0,
		sy: defaultSize * 0,
	},
	left: {
		sx: 0,
		sy: defaultSize * 3,
	},
	right: {
		sx: 0,
		sy: defaultSize * 2,
	},
};

export interface CharacterSourceProps {
	sources: Array<string>;
	width: number;
	height: number;
	animationFrame: number;
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

export default info;
