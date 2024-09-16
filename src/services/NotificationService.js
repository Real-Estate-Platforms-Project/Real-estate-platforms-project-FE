import axios from "axios";

const URL_GET_ALL_NOTIFICATION = "http://localhost:8080/api/client/notifications";
const URL_ACTION_NOTIFICATION = "http://localhost:8080/api/admin/notifications";


export const getAllNotification = async (title) => {
    try {
        let url = `${URL_GET_ALL_NOTIFICATION}?_sort=created_at&_order=asc`;
        if (title) {
            url += `&title_like=${title}`;
        }
        let res = await axios.get(url);
        // console.log(res.data)
        return res.data;
    } catch (e) {
        return [];
    }
}

export const getNotificationDetail = async (id) => {
    try {
        let res = await axios.get(URL_GET_ALL_NOTIFICATION + `/${id}`);
        return res.data;
    } catch (e) {
        return [];
    }
}

export const deleteNotification = async (id) => {
    try {
        await axios.delete(`${URL_ACTION_NOTIFICATION}/${id}`);
    } catch (e) {
        throw e;
    }
}

export const addNotification = async (notification) => {
    try {
        const response = await axios.post(URL_ACTION_NOTIFICATION, notification);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateNotification = async (notification) => {
    try {
        const url = `${URL_ACTION_NOTIFICATION}/${notification.id}`;
        console.log('Cập nhật thông báo:', notification);
        console.log('URL:', url);

        const response = await axios.put(url, notification, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Phản hồi:', response);
        console.log('Dữ liệu phản hồi:', response.data);
        console.log('Mã trạng thái:', response.status);

        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật thông báo:', error);

        if (error.response) {
            // Server phản hồi với trạng thái lỗi
            console.error('Dữ liệu phản hồi:', error.response.data);
            console.error('Trạng thái phản hồi:', error.response.status);
            console.error('Header phản hồi:', error.response.headers);
        } else if (error.request) {
            // Yêu cầu đã được thực hiện nhưng không nhận được phản hồi
            console.error('Dữ liệu yêu cầu:', error.request);
        } else {
            // Một cái gì đó đã xảy ra trong quá trình thiết lập yêu cầu
            console.error('Thông điệp lỗi:', error.message);
        }

        throw error;
    }
};
