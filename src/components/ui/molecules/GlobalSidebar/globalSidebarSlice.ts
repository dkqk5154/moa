import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const maxScale = 2;
const minScale = 0;

export interface GlobalSideBarStateProps {
	status: 'home' | 'build' | 'popup';
	scale: number;
	tileSize: number;
}

const initialState: GlobalSideBarStateProps = {
	status: 'home',
	scale: 1,
	tileSize: 16,
};

export const globalSideBarSlice = createSlice({
	name: 'GlobalSidebar',
	initialState,
	reducers: {
		setStatus: (props, action) => {
			props.status = action.payload;
		},
		setScale: (props, action) => {
			if (action.payload < maxScale || action.payload > minScale) {
				props.scale = action.payload;
			}
		},
	},
});

export const { setStatus, setScale } = globalSideBarSlice.actions;

export const selectStatus = (state: RootState) =>
	state.globalSidebarReducer.status;

export const selectScale = (state: RootState) =>
	state.globalSidebarReducer.scale;

export const selectTileSize = (state: RootState) =>
	state.globalSidebarReducer.tileSize;

export default globalSideBarSlice.reducer;
