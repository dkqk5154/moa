import React from 'react';
import styled from 'styled-components';

const Styled = {
	Wrapper: styled.div``,
};

export interface ObjectBlockProps {
	info: any;
}

const ObjectBlock = (props: ObjectBlockProps) => {
	const { info } = props;
	return <Styled.Wrapper>{info}</Styled.Wrapper>;
};
ObjectBlock.defaultProps = {
	info: '',
};

export default ObjectBlock;
