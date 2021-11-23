import React from 'react';
import styled from 'styled-components';

import {
	useAppDispatch,
	// useAppSelector
} from 'app/hooks';
import blockSources from 'images/Block';
import tileSources from 'images/Tile';
import objectSources from 'images/Object';
import { setSelectBuildBlockInfo } from './buildMenuSlice';
import { BlockTypeProps } from 'components/objects/Block/blockSlice';
import TileImage from 'components/ui/atoms/TileImage';
import 'images/type.d.ts';
import moment from 'moment';
// import { selectScale } from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';

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
	// const scale = useAppSelector(selectScale);

	const formatBlockInfos = ({
		infos,
		type,
	}: {
		infos: Array<ImageSourceProps>;
		type: BlockTypeProps;
	}) => {
		return infos.map((res: ImageSourceProps) => {
			const { name, width, height, up, sources, locationName } = res;
			const { sx, sy } = up;

			return (
				<Styled.ImageWrapper
					key={name}
					onClick={() => {
						dispatch(
							setSelectBuildBlockInfo({
								name: name,
								direction: 'up',
								point: { x: 0, y: 0 },
								size: { width: width, height: height },
								type: type,
								key: moment().format('YYMMDDHHmmss'),
								imageInfo: {
									...res,
								},
							}),
						);
					}}
				>
					<Styled.TileImageWrapper>
						<TileImage
							sx={sx * 2}
							sy={sy * 2}
							src={sources[2]}
							width={width * 2}
							height={height * 2}
						/>
					</Styled.TileImageWrapper>
					<span>
						<b>{locationName['kr']}</b>
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
