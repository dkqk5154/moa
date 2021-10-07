import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import characterReducer from 'components/atoms/Character/characterSlice';
import blockReducer from 'components/atoms/Block/blockSlice';
import globalSidebarReducer from 'components/molecules/GlobalSidebar/globalSidebarSlice';
import buildMenuReducer from 'components/atoms/BuildMenu/buildMenuSlice';

export const store = configureStore({
	reducer: {
		character: characterReducer,
		block: blockReducer,
		globalSidebarReducer: globalSidebarReducer,
		buildMenuReducer: buildMenuReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
