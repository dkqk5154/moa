export type ThemeColorProps = {
	[key: string]: string;
};
export type ThemeArrayProps = Array<number>;

const colors: ThemeColorProps = {
	white: '#ffffff',
	black: '#000000',
	gray1: '#a1a6b6',
	gray2: '#6b7185',
	gray3: '#3a3f50',
	gray4: '#282b39',
	gray5: '#242735',
	gray6: '#11131b',
	primary1: '#99c1f8',
	primary2: '#6ea7f5',
	primary3: '#3082f2',
	primary4: '#046cfc',
	primary5: '#004eba',
	primary6: '#1c2f50',
	success1: '#b8ecd5',
	success2: '#8ae0ba',
	success3: '#58d49d',
	success4: '#10c274',
	success5: '#048a4f',
	warning1: '#fce2ac',
	warning2: '#fad076',
	warning3: '#f8bc3b',
	warning4: '#f7ac0a',
	warning5: '#bd850f',
	danger1: '#feb4b6',
	danger2: '#f28286',
	danger3: '#fe4c52',
	danger4: '#fe383f',
	danger5: '#be3637',
	transparent: 'rgba(0, 0, 0, 0)',
};
const space: ThemeArrayProps = [4, 8, 12, 16, 20, 24, 32, 36, 40];
const fontSizes: ThemeArrayProps = [10, 12, 14, 16, 18, 24, 32, 42, 64];
const radii: ThemeArrayProps = [4, 8, 12, 16];

const theme = {
	colors,
	space,
	fontSizes,
	radii,
};

export default theme;
