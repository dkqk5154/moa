import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import characterReducer from 'components/objects/Character/characterSlice';
import blockReducer from 'components/objects/Block/blockSlice';
import buildMenuReducer from 'components/ui/molecules/BuildMenu/buildMenuSlice';
import globalSidebarReducer from 'components/ui/molecules/GlobalSidebar/globalSidebarSlice';
import globalPopupMenuReducer from 'components/ui/organisms/GlobalPopupMenu/globalPopupMenuSlice';
import mapReducer from 'components/objects/Block/mapSlice';

export const store = configureStore({
	reducer: {
		character: characterReducer,
		block: blockReducer,
		buildMenuReducer: buildMenuReducer,
		globalSidebarReducer: globalSidebarReducer,
		globalPopupMenuReducer: globalPopupMenuReducer,
		map: mapReducer,
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
