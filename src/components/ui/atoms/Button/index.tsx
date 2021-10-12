import styled from 'styled-components';

// export interface ButtonProps {

// }

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: var(--gray4);
	color: var(--white);
	font-size: var(--font-size6);
	padding: var(--space3);
	border: 0px;
	border-radius: var(--radius2);
	font-weight: bold;
	:hover {
		background-color: var(--gray3);
	}
	:active {
		background-color: var(--gray5);
	}
	:focus {
		outline: none;
	}
`;

export default Button;
