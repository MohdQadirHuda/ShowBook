import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:'login',
    initialState:{
        data:false,
    },
    reducers:{
        logIN:(state,action) => {
            state.data = true;
        },
        logOUT:(state,action) => {
            state.data = false;
        },
    }
})

export const {logIN, logOUT} = loginSlice.actions;

export default loginSlice.reducer;