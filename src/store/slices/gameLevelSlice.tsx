import { createSlice } from "@reduxjs/toolkit";

// Explicitly export the type
export interface GameLevelState {
    levelMatrixNumber: number;
}

const initialState: GameLevelState = {
    levelMatrixNumber: 3,
};

const gameLevelSlice = createSlice({
    name: "gameLevel",
    initialState,
    reducers: {
        setLevelMatrixNumber: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                levelMatrixNumber: payload,
            };
        },
    },
});

export const { setLevelMatrixNumber } = gameLevelSlice.actions;
export default gameLevelSlice.reducer;
