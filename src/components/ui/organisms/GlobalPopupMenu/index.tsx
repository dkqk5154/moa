import React from 'react';
import styled from 'styled-components';
import { selectSelectBlockInfo } from './globalPopupMenuSlice';
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

	const selectBlockType = selectObjectBlockInfo?.type;

	return (
		<Styled.Wrapper>
			{(selectBlockType === 'block' || selectBlockType === 'object') && (
				<PopupBlockMenu info={selectObjectBlockInfo} />
			)}
		</Styled.Wrapper>
	);
};

export default GlobalObjectMenu;
