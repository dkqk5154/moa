const defaultSize = 16;
const scale1Source = require('./image1.png').default;
const scale2Source = require('./image2.png').default;
const scale3Source = require('./image3.png').default;

const infos: Array<ImageSourceProps> = [
	{
		name: 'woodObject',
		locationName: {
			kr: '나무 오브젝트',
			en: 'WoodObject',
		},
		sources: ['', scale1Source, scale2Source, scale3Source],
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

export default infos;
