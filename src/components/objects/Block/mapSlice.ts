import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface MapProps {
	mapSize: { width: number; height: number };
	mapPoint: { startX: number; startY: number };
}

const initialState: MapProps = {
	mapSize: { width: 300, height: 300 },
	mapPoint: { startX: -128, startY: -128 },
};

export const mapSlice = createSlice({
	name: 'Map',
	initialState,
	reducers: {
		setMapSize: (state, action: PayloadAction<MapProps['mapSize']>) => {
			state.mapSize = action.payload;
		},
		setMapPoint: (state, action: PayloadAction<MapProps['mapPoint']>) => {
			state.mapPoint = action.payload;
		},
	},
});

export const { setMapSize, setMapPoint } = mapSlice.actions;

export const selectMapSize = (state: RootState) => state.map.mapSize;
export const selectMapPoint = (state: RootState) => state.map.mapPoint;

export default mapSlice.reducer;
