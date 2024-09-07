import axios from "axios";

const URL_GET_ALL_NOTIFICATION = "http://localhost:8080/api/client/notifications";
const URL_ACTION_NOTIFICATION = "http://localhost:8080/api/admin/notifications";


export const getAllNotification = async (title) => {
    try {
        let url = `${URL_GET_ALL_NOTIFICATION}?_sort=created_at&_order=desc`;
        if (title) {
            url += `&title_like=${title}`;
        }
        let res = await axios.get(url);
        return res.data;
    } catch (e) {
        return [];
    }
}