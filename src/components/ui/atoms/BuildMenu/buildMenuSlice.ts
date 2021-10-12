import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import { BlockStateInfosProps } from 'components/objects/Block/blockSlice';

export interface BuildMenuStateProps {
	buildBlockInfos: Array<BlockStateInfosProps>;
	selectBuildBlockInfo?: BlockStateInfosProps;
}

const initialState: BuildMenuStateProps = {
	buildBlockInfos: [],
};

export const buildMenuSlice = createSlice({
	name: 'BuildMenu',
	initialState,
	reducers: {
		setSelectBuildInfo: (
			state,
			action: PayloadAction<BuildMenuStateProps['selectBuildBlockInfo']>,
		) => {
			state.selectBuildBlockInfo = action.payload;
		},
		setBuildBlockInfos: (
			state,
			action: PayloadAction<BuildMenuStateProps['buildBlockInfos']>,
		) => {
			state.buildBlockInfos = action.payload;
		},
	},
});

export const { setSelectBuildInfo, setBuildBlockInfos } =
	buildMenuSlice.actions;

export const selectSelectBuildBlockInfo = (state: RootState) =>
	state.buildMenuReducer.selectBuildBlockInfo;

export default buildMenuSlice.reducer;
