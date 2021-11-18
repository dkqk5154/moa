import React from 'react';
import styled from 'styled-components';
import { selectSelectBlockInfo } from './globalPopupMenuSlice';
import {
	selectScale,
	selectStatus,
} from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import { useAppSelector } from 'app/hooks';
import PopupBlockMenu from 'components/ui/molecules/PopupBlockMenu';

const Styled = {
	Wrapper: styled.div`
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
	`,
};

const GlobalObjectMenu = () => {
	const selectObjectBlockInfo = useAppSelector(selectSelectBlockInfo);
	const status = useAppSelector(selectStatus);
	const scale = useAppSelector(selectScale);

	const selectBlockType = selectObjectBlockInfo?.type;

	return (
		status === 'home' && (
			<Styled.Wrapper>
				{(selectBlockType === 'block' ||
					selectBlockType === 'object') && (
					<PopupBlockMenu
						info={selectObjectBlockInfo}
						scale={scale}
					/>
				)}
			</Styled.Wrapper>
		)
	);
};

export default GlobalObjectMenu;
