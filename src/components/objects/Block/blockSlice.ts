import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { BlockSourceProps } from 'images/Block';

export type BlockDirectionProps = 'up' | 'left' | 'right' | 'down';

export type BlockTypeProps = 'object' | 'block' | 'tile' | 'system';

export type BlockStateInfoProps = {
	name: string;
	point: { x: number; y: number };
	size: { width: number; height: number };
	type: BlockTypeProps;
	direction: BlockDirectionProps;
	key: string;
	objectInfo?: {
		type: string;
		value: any;
	};
	imageInfo: BlockSourceProps;
};

export interface BlockStateProps {
	infos: Array<BlockStateInfoProps>;
}

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
		addBlockInfos: (
			state,
			action: PayloadAction<BlockStateProps['infos']>,
		) => {
			state.infos = [...state.infos, ...action.payload];
		},
		addBlockInfo: (state, action: PayloadAction<BlockStateInfoProps>) => {
			state.infos = [...state.infos, action.payload];
		},
	},
});

export const { setBlockInfos, addBlockInfos, addBlockInfo } =
	blockSlice.actions;

export const selectBlockInfos = (state: RootState) =>
	state.block.infos.filter(res => res.type === 'block');
export const selectTileInfos = (state: RootState) =>
	state.block.infos.filter(res => res.type === 'tile');
export const selectObjectBlockInfos = (state: RootState) =>
	state.block.infos.filter(res => res.type === 'object');
export const selectSystemBlockInfos = (state: RootState) =>
	state.block.infos.filter(res => res.type === 'system');

export default blockSlice.reducer;
