import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface BlockState {
	infos: Array<BlockStateInfosProps>;
}

export type BlockStateInfosProps = {
	position: { x: number; y: number };
	size: { width: number; height: number };
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
		setBlockInfos: (state, action: PayloadAction<BlockState>) => {
			state.infos = action.payload.infos;
		},
	},
});

export const { setBlockInfos } = blockSlice.actions;

export const selectBlockInfos = (state: RootState) => state.block.infos;

export default blockSlice.reducer;
