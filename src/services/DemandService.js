import axios from "axios";
import {getToken} from "../utils/storage";

    const URL_DEMAND = "http://localhost:8080/api/demand"

export const searchDemand = async (filters) => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );

        // Tạo query string từ các tham số đã lọc
        const params = new URLSearchParams(filteredFilters).toString();
        console.log(params)
        if (token != null) {
            const response = await axios.get(`${URL_DEMAND}/search?${params}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,// Thêm token vào header
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        }
        const response = await axios.get(`${URL_DEMAND}/search?${params}`)
        return response.data
    } catch (error) {
        console.error('Failed to fetch demand data', error);
        throw error;
    }
}

export const searchAccountDemand = async (filters) => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );
        const params = new URLSearchParams(filteredFilters).toString();
        console.log(params)
        if (token != null) {
            const response = await axios.get(`${URL_DEMAND}/account/search?${params}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,// Thêm token vào header
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        }
        return []
    } catch (error) {
        console.error('Failed to fetch demand data', error);
        throw error;
    }
}
export const deleteDemand = async (id) => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        await axios.delete(URL_DEMAND + "/" + id, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return true;
    } catch (e) {
        return false;
    }
}

export const verifyDemand = async (demand) => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        await axios.put(URL_DEMAND + "/" + demand.id + "/verify", demand, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return true;
    } catch (e) {
        return false;
    }
}

export const editDemand = async (demand) => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        await axios.put(URL_DEMAND + "/" + demand.id + "/edit", demand, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        return true;
    } catch (e) {
        return false;
    }
}

export const getDemand = async (id) => {
    try {
        const token = getToken(); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
        let res = await axios.get(URL_DEMAND + "/" + id, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        });
        console.log(res.data)
        return res.data;
    } catch (e) {
        return [];
    }
}

export const saveDemand = async (demand) => {
    try {
        const token = getToken();// Lấy token từ localStorage hoặc nơi bạn lưu trữ
        console.log(token)
        await axios.post(URL_DEMAND, demand, {
            headers: {
                "Authorization": `Bearer ${token}`,// Thêm token vào header
                "Content-Type": "application/json",
            }
        })
        return true
    } catch (e) {
        return false
    }
}