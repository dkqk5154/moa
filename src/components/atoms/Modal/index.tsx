import React from 'react';
import styled from 'styled-components';

const Styled = {
	Wrapper: styled.div<{ isModal: boolean }>`
		display: ${props => (props.isModal ? 'flex' : 'none')};
		color: #ffffff;
		position: fixed;
		z-index: 31;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.7);
		text-align: center;
	`,

	ModalContent: styled.div`
		background-color: #fefefe;
		margin: 20% auto;
		border-radius: 10px;
		animation: modalShow 0.15s;
		@keyframes modalShow {
			from {
				transform: scale(0);
			}
			to {
				transform: scale(1);
			}
		}
		@keyframes modalClose {
			from {
				transform: scale(0);
			}
			to {
				transform: scale(1);
			}
		}
		h2 {
			font-size: 25px;
		}
	`,
};

export interface ModalProps {
	isModal: boolean;
	children?: any;
}

const Modal = (props: ModalProps) => {
	const { isModal, children } = props;
	return <Styled.Wrapper isModal={isModal}>{children}</Styled.Wrapper>;
};



Modal.defaultProps = {
	children: '',
	isModal: false,
};

export default Modal;
