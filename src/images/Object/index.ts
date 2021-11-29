const defaultSize = 16;
const scale1Source = require('./image1.png').default;
const scale2Source = require('./image2.png').default;
const scale3Source = require('./image3.png').default;

const lampScale1Source = require('./deco_lamp1.png').default;
const lampScale2Source = require('./deco_lamp2.png').default;
const lampScale3Source = require('./deco_lamp3.png').default;

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
	{
		name: 'lampObject',
		locationName: {
			kr: '나무 램프',
			en: 'WoodLamp',
		},
		sources: ['', lampScale1Source, lampScale2Source, lampScale3Source],
		width: defaultSize,
		height: defaultSize * 2,
		up: {
			sx: defaultSize * 0,
			sy: defaultSize * 1,
		},
		right: {
			sx: defaultSize * 0,
			sy: defaultSize * 1,
		},
		left: {
			sx: defaultSize * 0,
			sy: defaultSize * 1,
		},
		down: {
			sx: defaultSize * 0,
			sy: defaultSize * 1,
		},
	},
];

export default infos;
