import React from 'react';
import styled, { keyframes } from 'styled-components';

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
	Spinner: styled.div<{ size: string }>`
		margin: 0 auto;
		width: ${props => props.size};
		height: ${props => props.size};
		border: 0.35rem solid #ffffff;
		border-radius: 50%;
		border-top-color: #3082f2;
		animation: ${Keyframes.spinnerSpin} 1s ease-in-out infinite;
	`,
	SpinnerWrapper: styled.div`
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80vh;
	`,
};

interface SpinnerInterface {
	size?: string;
	isLoading?: boolean;
	children?: React.ReactNode;
}

const Spinner = ({
	size = '100%',
	isLoading = true,
	children,
}: SpinnerInterface): JSX.Element => {
	return isLoading ? (
		<Styled.SpinnerWrapper>
			<Styled.Spinner size={size} />
		</Styled.SpinnerWrapper>
	) : (
		<>{children}</>
	);
};

export default Spinner;
