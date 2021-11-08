import React from 'react';
import styled from 'styled-components';

import { GlobalPopupMenuProps } from 'components/ui/organisms/GlobalPopupMenu/globalPopupMenuSlice';
import PopupMenuCard from 'components/ui/atoms/PopupMenuCard';
import TileImage from 'components/ui/atoms/TileImage';

const Styled = {
	Wrapper: styled.div`
		display: flex;
		width: 320px;
		height: 160px;
	`,
	Img: styled.img`
		display: flex;
		width: 64px;
		height: 64px;
	`,
	Column: styled.div`
		display: flex;
		flex-direction: column;
		padding: var(--space3);
	`,
};

export interface PopupBlockMenuProps {
	info?: GlobalPopupMenuProps['selectBlockInfo'];
}

const PopupBlockMenu = ({ info }: PopupBlockMenuProps) => {
	return (
		<PopupMenuCard>
			<Styled.Wrapper>
				<Styled.Column>
					<TileImage
						src={info.imageInfo.source}
						width={info.size.width}
						height={info.size.height}
						sx={info.imageInfo.up.sx}
						sy={info.imageInfo.up.sy}
					/>
				</Styled.Column>
				<Styled.Column>
					<div>{info.type}</div>
					<div>{info.name}</div>
				</Styled.Column>
			</Styled.Wrapper>
		</PopupMenuCard>
	);
};

export default PopupBlockMenu;
