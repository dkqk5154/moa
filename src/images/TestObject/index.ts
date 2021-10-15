const info = {
	source: require('./image.png').default,
	info: {
		TestObject1: {
			width: 48 * 2,
			height: 48,
			up: {
				sx: 0,
				sy: 48 * 41,
			},
			right: {
				sx: 0,
				sy: 0,
			},
			left: {
				sx: 0,
				sy: 0,
			},
			down: {
				sx: 0,
				sy: 0,
			},
		},
	},
};

export interface TestBlockInfoProps {
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

export default info;
