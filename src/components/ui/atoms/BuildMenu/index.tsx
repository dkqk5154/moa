import React from 'react';
import styled from 'styled-components';

import { useAppDispatch } from 'app/hooks';
import testBlock, { TestBlockInfoProps } from 'images/TestBlock';
import testTile from 'images/TestTile';
import testObject from 'images/TestObject';
import { setSelectBuildInfo } from './buildMenuSlice';
import { BlockTypeProps } from 'components/objects/Block/blockSlice';

interface TileCutImageProps {
	src: string;
	sx: number;
	sy: number;
	width: number;
	height: number;
}

const Styled = {
	Wrapper: styled.div`
		width: 100%;
		display: grid;
		grid-template-columns: auto auto;
		grid-auto-rows: 100px 100px;
		grid-gap: var(--space5);
		padding: var(--space5);
	`,
	ImageWrapper: styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--gray5);
		padding: var(--space3);
		border-radius: var(--radius3);
	`,
	TileCutImage: styled.div<TileCutImageProps>`
		background-image: ${({ src }) => `url(${src})`};
		background-position: ${({ sx, sy }) => `${sx}px -${sy}px`};
		background-repeat: no-repeat;
		width: 48px;
		height: 48px;
		margin-bottom: var(--space3);
	`,
};

export interface BuildMenuProps {
	info?: any;
}

const BuildMenu = ({ info = {} }: BuildMenuProps) => {
	const dispatch = useAppDispatch();

	const formatBlockInfos = ({
		info,
		source,
		type,
	}: {
		info: { [key: string]: TestBlockInfoProps };
		source: string;
		type: BlockTypeProps;
	}) => {
		return Object.keys(info).map((res: string) => {
			const { width, height, up } = info[res];
			const { sx, sy } = up;

			console.log({
				point: { x: 0, y: 0 },
				size: { width: width, height: height },
				type: type,
				key: '0',
				imageInfo: {
					source: source,
					...info[res],
				},
			});

			return (
				<Styled.ImageWrapper
					key={res}
					onClick={() => {
						dispatch(
							setSelectBuildInfo({
								point: { x: 0, y: 0 },
								size: { width: width, height: height },
								type: type,
								key: '0',
								imageInfo: {
									source: source,
									...info[res],
								},
							}),
						);
					}}
				>
					<Styled.TileCutImage
						sx={-sx}
						sy={sy}
						src={source}
						width={width}
						height={height}
					/>
					<span>
						<b>{res}</b>
					</span>
				</Styled.ImageWrapper>
			);
		});
	};

	const blockInfos = formatBlockInfos({
		info: testBlock.info,
		source: testBlock.source,
		type: 'block',
	});

	const tileInfos = formatBlockInfos({
		info: testTile.info,
		source: testTile.source,
		type: 'tile',
	});

	const objectInfos = formatBlockInfos({
		info: testObject.info,
		source: testObject.source,
		type: 'object',
	});

	return (
		<Styled.Wrapper>
			{blockInfos}
			{tileInfos}
			{objectInfos}
		</Styled.Wrapper>
	);
};

export default BuildMenu;
