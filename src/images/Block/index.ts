const info = {
	source: require('./image.png').default,
	info: {
		stairsBlock: {
			width: 32,
			height: 32,
			up: {
				sx: 32 * 0,
				sy: 32 * 0,
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
		grayBlock: {
			width: 32,
			height: 32,
			up: {
				sx: 32 * 0,
				sy: 32 * 0,
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

export interface BlockInfoProps {
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
