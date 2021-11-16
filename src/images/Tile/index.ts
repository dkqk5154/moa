const info = {
	source: require('./image.png').default,
	info: {
		grassTile: {
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

export interface TileInfoProps {
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
