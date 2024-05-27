import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import loginReducer from "./loginReducer";
import cityReducer from "./cityReducer";
import { initializeApp } from "firebase/app";

export default configureStore({
  reducer: {
    cart: CartReducer,
    login: loginReducer,
    city: cityReducer,
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyCs1XST5ISqeQLiAcV6zmb7tEf0dKkiuqY",
  authDomain: "showbook-48dac.firebaseapp.com",
  projectId: "showbook-48dac",
  storageBucket: "showbook-48dac.appspot.com",
  messagingSenderId: "496657551876",
  appId: "1:496657551876:web:442b4a7e6672fcfbb21b51",
  measurementId: "G-SWTD6R1YXV",
};

export const app = initializeApp(firebaseConfig);
