import theme from 'styles/theme';

export const defaultRechartOptions = {
	xAxisOptions: {
		fill: theme.colors.gray300,
		stroke: theme.colors.gray300,
		style: { fill: theme.colors.gray300 },
	},
	yAxisOptions: {
		fill: theme.colors.gray300,
		stroke: theme.colors.transparent,
		style: { fill: theme.colors.gray300 },
	},
	cartesianGridOptions: {
		vertical: false,
		strokeDasharray: '6 6',
	},
};
