import React from 'react';
import styled from 'styled-components';

const Styled = {
	Wrapper: styled.div`
		position: absolute;
		top: 32px;
		z-index: 101;
		background-color: var(--gray6);
		border: 3px solid var(--white);
		border-radius: 6px;
		padding: var(--space5);
	`,
};

export interface PopupMenuCardProps {
	children?: React.ReactNode;
}

const PopupMenuCard = ({ children }: PopupMenuCardProps) => {
	return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

export default PopupMenuCard;
