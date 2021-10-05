import React from 'react';
import styled from 'styled-components';

import { setBlockInfos } from 'components/atoms/Block/blockSlice';

import { useAppDispatch } from 'app/hooks';
import testBlock, { TestBlockInfoProps } from 'images/TestBlock';

const Styled = {
	Wrapper: styled.div`
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 2fr;
		padding: var(--space3);
		align-items: center;
		justify-content: center;
	`,
	ImageWrapper: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	`,
	TileCutImage: styled.div<{ src: string; sx: number; sy: number }>`
		background-image: ${({ src }) => `url(${src})`};
		background-position: ${({ sx, sy }) => `${sx}px -${sy}px`};
		background-repeat: no-repeat;
		width: 48px;
		height: 48px;
		margin-bottom: var(--space2);
	`,
};

export interface BuildMenuProps {
	info: any;
}

const BuildMenu = (props: BuildMenuProps) => {
	const dispatch = useAppDispatch();

	const blockInfos = Object.keys(testBlock.info).map(
		(res: string, i: number) => {
			const { sx, sy }: TestBlockInfoProps = testBlock.info[res];
			return (
				<Styled.ImageWrapper>
					<Styled.TileCutImage
						sx={sx}
						sy={sy}
						src={require('images/TestBlock/image.png').default}
					/>
					<span>
						<b>{res}</b>
					</span>
				</Styled.ImageWrapper>
			);
		},
	);

	return <Styled.Wrapper>{blockInfos}</Styled.Wrapper>;
};
BuildMenu.defaultProps = {
	info: '',
};

export default BuildMenu;
