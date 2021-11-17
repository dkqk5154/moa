import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface GlobalSideBarStateProps {
	status: 'home' | 'build' | 'popup';
	scale: number;
}

const initialState: GlobalSideBarStateProps = {
	status: 'home',
	scale: 1,
};

export const globalSideBarSlice = createSlice({
	name: 'GlobalSidebar',
	initialState,
	reducers: {
		setStatus: (props, action) => {
			props.status = action.payload;
		},
		setScale: (props, action) => {
			props.scale = action.payload;
		},
	},
});

export const { setStatus, setScale } = globalSideBarSlice.actions;

export const selectStatus = (state: RootState) =>
	state.globalSidebarReducer.status;

export const selectScale = (state: RootState) =>
	state.globalSidebarReducer.scale;

export default globalSideBarSlice.reducer;
