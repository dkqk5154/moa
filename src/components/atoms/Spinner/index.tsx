import React from 'react';
import styled, { keyframes } from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const Keyframes = {
	spinnerSpin: keyframes`
    to {
      -moz-transform: rotate(360deg);  /* FF3.5/3.6 */
      -o-transform: rotate(360deg);  /* Opera 10.5 */
      -webkit-transform: rotate(360deg);  /* Saf3.1+ */
      transform: rotate(360deg);  /* Newer browsers (incl IE9) */
    }
  `,
};

const Styled = {
	Body: styled(GlobalStyled.Row)<{ height: string }>`
		width: 100%;
		height: ${props => props.height};
		margin: auto;
		justify-content: center;
		align-items: center;
	`,
	LoadingCircle: styled.div<{ size: string }>`
		margin: 0 auto;
		width: ${props => props.size};
		height: ${props => props.size};
		border: 0.35rem solid ${props => props.theme.colors.gray100};
		border-radius: 50%;
		border-top-color: ${props => props.theme.colors.primary3};
		animation: ${Keyframes.spinnerSpin} 1s ease-in-out infinite;
	`,
};

interface SpinnerInterface {
	size: string;
	height: string;
	isLoading: boolean;
	children: any;
}

const Spinner = (props: SpinnerInterface) => {
	const { size, height, isLoading, children } = props;

	return isLoading ? (
		<Styled.Body height={height}>
			<Styled.LoadingCircle size={size} />
		</Styled.Body>
	) : (
		<>{children}</>
	);
};

Spinner.defaultProps = {
	size: '100%',
	height: '',
	isLoading: true,
	children: '',
};

export default Spinner;
