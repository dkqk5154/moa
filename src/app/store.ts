import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import characterReducer from 'components/objects/Character/characterSlice';
import blockReducer from 'components/objects/Block/blockSlice';
import buildMenuReducer from 'components/ui/molecules/BuildMenu/buildMenuSlice';
import globalSidebarReducer from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import globalPopupMenuReducer from 'components/ui/organisms/GlobalPopupMenu/globalPopupMenuSlice';

export const store = configureStore({
	reducer: {
		character: characterReducer,
		block: blockReducer,
		buildMenuReducer: buildMenuReducer,
		globalSidebarReducer: globalSidebarReducer,
		globalPopupMenuReducer: globalPopupMenuReducer,
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
