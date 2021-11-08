import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface BlockStateProps {
	infos: Array<BlockStateInfosProps>;
}

export type BlockTypeProps = 'object' | 'block' | 'tile' | 'system';

export type BlockStateInfosProps = {
	name: string;
	point: { x: number; y: number };
	size: { width: number; height: number };
	type: BlockTypeProps;
	key: string;
	objectInfo?: {
		type: string;
		value: any;
	};
	imageInfo: {
		source: string;
		up: {
			sx: number;
			sy: number;
		};
		down: {
			sx: number;
			sy: number;
		};
		left: {
			sx: number;
			sy: number;
		};
		right: {
			sx: number;
			sy: number;
		};
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
		addBlockInfos: (
			state,
			action: PayloadAction<BlockStateProps['infos']>,
		) => {
			state.infos = [...state.infos, ...action.payload];
		},
		addBlockInfo: (state, action: PayloadAction<BlockStateInfosProps>) => {
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
