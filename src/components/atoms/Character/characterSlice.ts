import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export interface CharacterState {
	position: { x: number; y: number };
	size: { width: number; height: number };
	direction: 'up' | 'left' | 'right' | 'down';
	speed: number;
	delay: number;
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
}

const initialState: CharacterState = {
	position: { x: 0, y: 0 },
	direction: 'down',
	size: { width: 0, height: 0 },
	speed: 64,
	delay: 120,
	imageInfo: {
		source: '',
		up: {
			sx: 0,
			sy: 0,
		},
		down: {
			sx: 0,
			sy: 0,
		},
		left: {
			sx: 0,
			sy: 0,
		},
		right: {
			sx: 0,
			sy: 0,
		},
	},
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
			position.x = action.payload.x;
			position.y = action.payload.y;
		},
		setDirection: (
			state,
			action: PayloadAction<CharacterState['direction']>,
		) => {
			state.direction = action.payload;
		},
		setSize: (state, action: PayloadAction<CharacterState['size']>) => {
			state.size = action.payload;
		},
		setSpeed: (state, action: PayloadAction<CharacterState['speed']>) => {
			state.speed = action.payload;
		},
		setImageInfo: (
			state,
			action: PayloadAction<CharacterState['imageInfo']>,
		) => {
			state.imageInfo = action.payload;
		},
	},
});

export const {
	moveRight,
	moveLeft,
	moveDown,
	moveUp,
	setPosition,
	setDirection,
	setSize,
	setSpeed,
	setImageInfo,
} = characterSlice.actions;

export const selectPosition = (state: RootState) => state.character.position;
export const selectSpeed = (state: RootState) => state.character.speed;
export const selectDelay = (state: RootState) => state.character.delay;
export const selectSize = (state: RootState) => state.character.size;
export const selectDirection = (state: RootState) => state.character.direction;
export const selectImageInfo = (state: RootState) => state.character.imageInfo;

export default characterSlice.reducer;
