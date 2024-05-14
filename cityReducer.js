import { createSlice } from "@reduxjs/toolkit";

export const citySlice = createSlice({
    name:'city',
    initialState:{
        data:false,
    },
    reducers:{
        setCityState:(state,action) => {
            state.data = true;
        },
        resetCityState:(state,action) => {
            state.data = false;
        },
    }
})

export const {setCityState, resetCityState} = citySlice.actions;

export default citySlice.reducer;