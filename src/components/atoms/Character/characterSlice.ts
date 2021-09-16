import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'app/store';

export interface CharacterState {
	position: { x: number; y: number };
	speed: number;
	delay: number;
}

const initialState: CharacterState = {
	position: { x: 0, y: 0 },
	speed: 64,
	delay: 120,
};

export const characterSlice = createSlice({
	name: 'Character',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		moveRight: ({ position, speed }: CharacterState) => {
			position.x += speed;
		},
		moveLeft: ({ position, speed }: CharacterState) => {
			position.x -= speed;
		},
		moveUp: ({ position, speed }: CharacterState) => {
			position.y -= speed;
		},
		moveDown: ({ position, speed }: CharacterState) => {
			position.y += speed;
		},
		setPosition: (
			{ position },
			action: PayloadAction<CharacterState['position']>,
		) => {
			position = action.payload;
		},
		setSpeed: (
			{ speed },
			action: PayloadAction<CharacterState['speed']>,
		) => {
			speed = action.payload;
		},
	},
});

export const { moveRight, moveLeft, moveDown, moveUp, setPosition, setSpeed } =
	characterSlice.actions;

export const selectPosition = (state: RootState) => state.character.position;
export const selectSpeed = (state: RootState) => state.character.speed;
export const selectDelay = (state: RootState) => state.character.delay;

export const setIfPosition =
	(position: CharacterState['position']): AppThunk =>
	dispatch => {
		dispatch(setPosition(position));
	};

export const setIfSpeed =
	(speed: CharacterState['speed']): AppThunk =>
	dispatch => {
		dispatch(setSpeed(speed));
	};

export default characterSlice.reducer;
