import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface BlockStateProps {
	infos: Array<BlockStateInfosProps>;
}

export type BlockTypeProps = 'object' | 'block' | 'tile'

export type BlockStateInfosProps = {
	position: { x: number; y: number };
	size: { width: number; height: number };
	type : string;
	key: string;
	imageInfo: {
		source: string;
		width: number;
		height: number;
		sx: number;
		sy: number;
	};
};

const initialState: BlockStateProps = {
	infos: [],
};

export const blockSlice = createSlice({
	name: 'Block',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setBlockInfos: (state, action: PayloadAction<BlockStateProps>) => {
			state.infos = action.payload.infos;
		},
	},
});

export const { setBlockInfos } = blockSlice.actions;

export const selectBlockInfos = (state: RootState) => state.block.infos.filter(res=>res.type === 'block');
export const selectTileInfos = (state: RootState) => state.block.infos.filter(res=>res.type === 'tile');

export default blockSlice.reducer;
