const info = {
	source: require('./image.png').default,
	info: {
		stairsBlock: {
			width: 48,
			height: 48,
			up: {
				sx: 48 * 6,
				sy: 48 * 2,
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
			width: 48,
			height: 48,
			up: {
				sx: 0,
				sy: 154,
			},
			right: {
				sx: 0,
				sy: 154,
			},
			left: {
				sx: 0,
				sy: 154,
			},
			down: {
				sx: 0,
				sy: 154,
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