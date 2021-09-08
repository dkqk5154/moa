import React from 'react'
import styled from 'styled-components';

interface PageTemplateInterface {
	children: React.ReactNode;
}

const Styled = {
	Body: styled.div`
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	`,
	Container: styled.div`
		width: 100%;
		max-width: 720px;
		margin: 0 auto;
	`,
};

const PageTemplate = (props: PageTemplateInterface): JSX.Element => {
	const { children } = props;
	return (
		<Styled.Body>
			<Styled.Container>{children}</Styled.Container>
		</Styled.Body>
	);
};

PageTemplate.defaultProps = {
	children: '',
};

export default PageTemplate;