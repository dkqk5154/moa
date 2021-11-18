import React from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import blockSources, { BlockSourceProps } from 'images/Block';
import tileSources, { TileSourcesProps } from 'images/Tile';
import objectSources from 'images/Object';
import { setSelectBuildInfo } from './buildMenuSlice';
import { BlockTypeProps } from 'components/objects/Block/blockSlice';
import TileImage from 'components/ui/atoms/TileImage';
import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';

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
		justify-content: center;
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
	const scale = useAppSelector(selectScale);

	const formatBlockInfos = ({
		infos,
		type,
	}: {
		infos: Array<TileSourcesProps>;
		type: BlockTypeProps;
	}) => {
		return infos.map((res: TileSourcesProps | BlockSourceProps) => {
			const { name, width, height, up, sources } = res;
			const { sx, sy } = up;

			return (
				<Styled.ImageWrapper
					key={name}
					onClick={() => {
						dispatch(
							setSelectBuildInfo({
								name: name,
								point: { x: 0, y: 0 },
								size: { width: width, height: height },
								type: type,
								key: '0',
								imageInfo: {
									...res,
								},
							}),
						);
					}}
				>
					<Styled.TileImageWrapper>
						<TileImage
							sx={sx}
							sy={sy}
							src={sources[scale]}
							width={width}
							height={height}
						/>
					</Styled.TileImageWrapper>
					<span>
						<b>{name}</b>
					</span>
				</Styled.ImageWrapper>
			);
		});
	};

	const blockInfos = formatBlockInfos({
		infos: blockSources,
		type: 'block',
	});

	const tileInfos = formatBlockInfos({
		infos: tileSources,
		type: 'tile',
	});

	const objectInfos = formatBlockInfos({
		infos: objectSources,
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
