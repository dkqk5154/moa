import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface BlockState {
	infos: Array<BlockStateInfosProps>;
}

export type BlockStateInfosProps = {
	x: number;
	y: number;
	key: string;
	imageInfo: {
		source: string;
		width: number;
		height: number;
		sx: number;
		sy: number;
	};
};

const initialState: BlockState = {
	infos: [],
};

export const blockSlice = createSlice({
	name: 'Block',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setInfos: (state, action: PayloadAction<BlockState>) => {
			state.infos = action.payload.infos;
		},
	},
});

export const { setInfos } = blockSlice.actions;

export const selectInfos = (state: RootState) => state.block.infos;

export default blockSlice.reducer;
