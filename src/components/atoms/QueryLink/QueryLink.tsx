import React from 'react';
import styled from 'styled-components';
import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Link: styled(GlobalStyled.Link)`
		height: 100%;
		width: 108px;
		justify-content: center;
		border-bottom: ${props => props.bb};
		border-color: ${props => props.bc};
	`,
};

export interface QueryLinkProps {
	info: {
		value: string;
		to: string;
		label: string;
	};
	matchValue: string;
}

const QueryLink = (props: QueryLinkProps) => {
	const { info, matchValue } = props;
	const { value, to, label } = info;

	return (
		<GlobalStyled.Col
			key={value}
			fontWeight={value === matchValue ? 'bold' : ''}
			color={value === matchValue ? 'blue500' : 'gray500'}
		>
			<Styled.Link
				p={4}
				pb={value === matchValue ? 3 : 4}
				bb={value === matchValue ? '4px solid' : ''}
				bc={value === matchValue ? 'blue500' : ''}
				to={to}
			>
				{label}
			</Styled.Link>
		</GlobalStyled.Col>
	);
};
QueryLink.defaultProps = {
	info: {
		value: '-',
		to: '-',
		label: '-',
	},
	matchValue: '-',
};

export default QueryLink;
