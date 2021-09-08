import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)``,
};

export interface CheckBoxInterface
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	labelAlign: 'right' | 'left';
}

const CheckBox = (props: CheckBoxInterface) => {
	const {
		checked,
		name,
		onChange,
		required,
		labelAlign,
		label,
		disabled,
	} = props;
	return (
		<Styled.Wrapper>
			{labelAlign === 'left' ? label : ''}
			<input
				type="checkbox"
				name={name}
				checked={checked}
				onChange={onChange}
				required={required}
				disabled={disabled}
			/>
			{labelAlign === 'right' ? label : ''}
		</Styled.Wrapper>
	);
};
CheckBox.defaultProps = {
	value: false,
	name: '',
	label: '',
	onChange: () => {},
	required: false,
	labelAlign: 'right',
};

export default CheckBox;
