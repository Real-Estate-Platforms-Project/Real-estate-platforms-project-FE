import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";

const store = configureStore({
    reducer: {
        auth: UserReducer
    }
})

export default store;
