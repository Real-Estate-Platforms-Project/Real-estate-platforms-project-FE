import { FETCH_USER_SUCCESS, FETCH_USER_FAIL } from './FetchUser';

const initialState = {
    user: null,
    isAuthenticated: false,
    roles: [],
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                user: action.payload.user,
                isAuthenticated: true,
                roles: action.payload.roles,
                error: null,
            };
        case FETCH_USER_FAIL:
            return {
                user: null,
                isAuthenticated: false,
                roles: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
