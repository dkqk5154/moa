const info = {
	source: require('./image.png').default,
	info: {
		grassBlock: {
			width: 48,
			height: 48,
			up: {
				sx: 0,
				sy: 0,
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

export interface TestBlockInfoProps {
	sx: number;
	sy: number;
}

export default info;
