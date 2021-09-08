import React from 'react';
import ReactSelect, { Props } from 'react-select';

// const Styled = {
// 	Body: styled.div<BodyInterface>`
// 		font-size: ${props => levelSize[props.level]};
// 		width: ${props => props.width};
// 		.css-tlfecz-indicatorContainer {
// 		}
// 	`,
// };

export interface SelectProps extends Props {
	width?: string;
}

const Select = (props: SelectProps) => {
	const { styles, width } = props;

	return (
		<ReactSelect
			{...props}
			styles={{
				container: (provided: any, state: any) => ({
					...provided,
					width: width,
				}),
				...styles,
			}}
		/>
	);
};

Select.defaultProps = {
	options: [
		{
			label: '1',
			value: 1,
		},
		{
			label: '2',
			value: 2,
		},
		{
			label: '3',
			value: 3,
		},
	],
	value: {
		label: '1',
		value: 1,
	},
	isActive: true,
	isDisabled: false,
	onChange: function () {},
	styles: {
		control: (provided: any, state: any) => ({
			...provided,
			// border: `1px solid ${theme.color.realWhiteBlue}`,
		}),
		indicatorContainer: (provided: any, state: any) => ({
			...provided,
			// color: theme.color.whiteBlue,
		}),
	},
};

export default Select;
