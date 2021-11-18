const size = 32;

const info = {
	source: require('./image.png').default,
	width: size,
	height: size,
	animationFrame: 7,
	up: {
		sx: 0,
		sy: size * 1,
	},
	down: {
		sx: 0,
		sy: size * 0,
	},
	left: {
		sx: 0,
		sy: size * 3,
	},
	right: {
		sx: 0,
		sy: size * 2,
	},
};

export default info;
