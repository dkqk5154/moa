import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface GlobalSideBarStateProps {
	status: 'home' | 'build' | 'popup';
}

const initialState: GlobalSideBarStateProps = {
	status: 'home',
};

export const globalSideBarSlice = createSlice({
	name: 'GlobalSidebar',
	initialState,
	reducers: {
		setStatus: (props, action) => {
			props.status = action.payload;
		},
	},
});

export const { setStatus } = globalSideBarSlice.actions;

export const selectStatus = (state: RootState) =>
	state.globalSidebarReducer.status;

export default globalSideBarSlice.reducer;
