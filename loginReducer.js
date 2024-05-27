import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:'login',
    initialState:{
        data:false,
        authKey: null,
    },
    reducers:{
        logIN:(state,action) => {
            state.data = true;
            state.authKey = action.payload;
        },
        logOUT:(state,action) => {
            state.data = false;
            state.authKey = null;
        },
    }
})

export const {logIN, logOUT} = loginSlice.actions;

export default loginSlice.reducer;