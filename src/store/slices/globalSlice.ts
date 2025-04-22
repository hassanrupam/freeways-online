import { createSlice } from "@reduxjs/toolkit";

// Explicitly export the type
export interface GlobalState {
    isLoading: boolean;
}

const initialState: GlobalState = {
    isLoading: false,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        startLoading: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        stopLoading: (state) => {
            return {
                ...state,
                isLoading: false,
            };
        },
    },
});

export const { startLoading, stopLoading } = globalSlice.actions;
export default globalSlice.reducer;
