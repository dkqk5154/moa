const info = {
	source: require('./image.png').default,
	width: 48,
	height: 48,
	info: {
		grassBlock: {
			sx: 0,
			sy: 0,
		},
		grayBlock: {
			sx: 0,
			sy: 154,
		},
	},
};

export interface TestBlockInfoProps {
	sx: number;
	sy: number;
}

export default info;
