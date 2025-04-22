import { LevelWiseRoadData } from "@/types/dataTypes";
import { createSlice } from "@reduxjs/toolkit";

// Explicitly export the type
export interface LevelWiseRoadState {
    levelWiseRoad: LevelWiseRoadData;
}

const initialState: LevelWiseRoadState = {
    levelWiseRoad: {
        levelStoreKey: "level_1",
        roadCoordinates: [],
    },
};

const levelWiseRoadSlice = createSlice({
    name: "levelWiseRoad",
    initialState,
    reducers: {
        setLevelWiseRoadSlice: (state, action) => {
            const { payload } = action;
            console.log(payload)
            return {
                ...state,
                levelWiseRoad: payload,
            };
        },
        clearLevelRoadByKey: (state, action) => {
            const levelStoreKey = action.payload;
            return {
                ...state,
                levelWiseRoad: {
                    levelStoreKey,
                    roadCoordinates: [],
                },
            };
        },
    },
});

export const { setLevelWiseRoadSlice, clearLevelRoadByKey } = levelWiseRoadSlice.actions;
export default levelWiseRoadSlice.reducer;

