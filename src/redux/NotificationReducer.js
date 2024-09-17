import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    notifications: [],
    unReadCount: 0
};
const NotificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationsA: (state, action) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action) => {
            state.notifications = [action.payload, ...state.notifications];
        }
    }
});
export const {setNotificationsA, addNotification} = NotificationReducer.actions;
export default NotificationReducer.reducer;