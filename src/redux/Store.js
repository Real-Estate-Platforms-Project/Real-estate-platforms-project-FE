import {configureStore} from "@reduxjs/toolkit";
import UserReducer from "./UserReducer";
import NotificationReducer from "./NotificationReducer";

const store = configureStore({
    reducer: {
        auth: UserReducer,
        notification: NotificationReducer
    }
})

export default store;
