import React from 'react';
import styled from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

const Styled = {
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
	`,
	DragAndDropBox: styled.label`
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid ${({ theme }) => theme.colors.gray3};
		padding: ${props => props.theme.space[4]}px;
		height: 100%;
		background-color: ${props => props.theme.colors.gray4};
		color: ${({ theme }) => theme.colors.white};
		border-radius: ${({ theme }) => theme.radii[3]}px;
	`,
};

export interface FileUploadProps
	extends React.HTMLAttributes<HTMLInputElement> {
	id: string;
	children?: React.ReactNode;
}

const FileUpload = (props): JSX.Element => {
	const { id, height, children } = props;

	let inputProps = { ...props };
	delete inputProps.children;

	return (
		<Styled.Wrapper height={height}>
			<input {...inputProps} type="file" style={{ display: 'none' }} />
			<Styled.DragAndDropBox htmlFor={id}>
				{children}
			</Styled.DragAndDropBox>
		</Styled.Wrapper>
	);
};

FileUpload.defaultProps = {
	id: 'file-upload',
	height: '100%',

	children: (
		<GlobalStyled.Col fontSize={5}>
			<b>파일업로드</b>
		</GlobalStyled.Col>
	),
};

export default FileUpload;
