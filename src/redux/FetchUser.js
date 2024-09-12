import apiClient from "../configs/AxiosConfigs";
import {getToken} from "../utils/storage";

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';

export const fetchUser = () => async (dispatch) => {
    try {
        if (getToken() == null) {
            return;
        }
        const response = await apiClient.get('/auth/me');

        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: {
                ...response.data
            },
        });
    } catch (error) {
        dispatch({
            type: FETCH_USER_FAIL,
            payload: error.response?.data || 'Không thể lấy thông tin người dùng!',
        });
    }
};
