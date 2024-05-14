import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import loginReducer from "./loginReducer";
import cityReducer from "./cityReducer";

export default configureStore({
    reducer:{
       cart:CartReducer,
       login: loginReducer,
       city: cityReducer,
    }
})