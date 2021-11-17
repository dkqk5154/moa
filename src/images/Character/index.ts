const size = 16;

const info = {
	source: require('./image.png').default,
	width: size,
	height: size,
	up: {
		sx: size * 2,
		sy: 0,
	},
	down: {
		sx: size * 1,
		sy: 0,
	},
	left: {
		sx: size * 0,
		sy: 0,
	},
	right: {
		sx: size * 3,
		sy: 0,
	},
};

export default info;
