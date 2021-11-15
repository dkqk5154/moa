import React from 'react';
import styled from 'styled-components';

import { useAppDispatch } from 'app/hooks';
import testBlock, { BlockInfoProps } from 'images/Block';
import testTile from 'images/Tile';
import testObject from 'images/Object';
import { setSelectBuildInfo } from './buildMenuSlice';
import { BlockTypeProps } from 'components/objects/Block/blockSlice';
import TileImage from 'components/ui/atoms/TileImage';

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
	TileImageWrapper: styled.div`
		display: flex;
		margin-bottom: var(--space3);
	`,
};

export interface BuildMenuProps {}

const BuildMenu = () => {
	const dispatch = useAppDispatch();

	const formatBlockInfos = ({
		info,
		source,
		type,
	}: {
		info: { [key: string]: BlockInfoProps };
		source: string;
		type: BlockTypeProps;
	}) => {
		return Object.keys(info).map((res: string) => {
			const { width, height, up } = info[res];
			const { sx, sy } = up;

			return (
				<Styled.ImageWrapper
					key={res}
					onClick={() => {
						dispatch(
							setSelectBuildInfo({
								name: res,
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
					<Styled.TileImageWrapper>
						<TileImage
							sx={sx}
							sy={sy}
							src={source}
							width={width}
							height={height}
						/>
					</Styled.TileImageWrapper>
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
