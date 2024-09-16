import {getToken, removeToken} from "../utils/storage";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiClient from "../configs/AxiosConfigs";

const initialState = {
    token: getToken(),
    user: null,
    isAuthenticated: false,
    roles: [],
    status: 'idle'
};


// Define an async thunk for fetching user information
export const fetchUser = createAsyncThunk('auth/fetchUser', async (token) => {
    const response = await apiClient.get('/auth/me');
    return response.data;
});

const UserReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = state.payload;
        },
        logout: (state) => {
            removeToken();
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.roles = [];
            state.status = 'idle';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.roles = action.payload.roles;
                state.isAuthenticated = true;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                localStorage.removeItem('token');
            });
    }
});

export const {setToken, logout} = UserReducer.actions;

export default UserReducer.reducer;