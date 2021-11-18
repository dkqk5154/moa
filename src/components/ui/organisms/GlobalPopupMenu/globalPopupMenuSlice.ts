import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BlockStateInfoProps } from 'components/objects/Block/blockSlice';

export interface GlobalPopupMenuProps {
	selectBlockInfo?: BlockStateInfoProps;
}

const initialState: GlobalPopupMenuProps = {};

export const globalObjectMenuSlice = createSlice({
	name: 'GlobalObjectMenu',
	initialState,
	reducers: {
		setSelectBlockInfo: (props, action) => {
			props.selectBlockInfo = action.payload;
		},
	},
});

export const { setSelectBlockInfo } = globalObjectMenuSlice.actions;

export const selectSelectBlockInfo = (state: RootState) =>
	state.globalPopupMenuReducer.selectBlockInfo;

export default globalObjectMenuSlice.reducer;
