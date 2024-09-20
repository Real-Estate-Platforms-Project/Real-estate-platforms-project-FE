import axios from "axios";
import apiClient from "../configs/AxiosConfigs";

const URL_REAL_ESTATE = "/real-estate";

export const saveRealEstate = async (realEstate) => {
    try {
        await apiClient.post(URL_REAL_ESTATE, realEstate);
        return true;
    } catch (e) {
        return false;
    }
};

export const getRealEstateById = async (id) => {
    try {
        const response = await apiClient.get(`http://localhost:8080/api/real-estate/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching real estate data:", error);
        throw error;
    }
};

export const findRealEstate = async () => {
    try {
        let res = await apiClient.get(URL_REAL_ESTATE + "/findAll");
        return res.data;
    } catch (e) {
        return [];
    }
}
export const searchRealEstate = async (filters) => {
    try {
        const filteredFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== null && value !== undefined && value !== '')
        );
        // Tạo query string từ các tham số đã lọc
        const params = new URLSearchParams(filteredFilters).toString();
        console.log(params)
        const response = await apiClient.get(`${URL_REAL_ESTATE}/search?${params}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Failed to fetch real estate data', error);
        throw error;
    }
};

export const findRealEstateBySellerId = async (id) => {
    try {
        const response = await apiClient.get(`http://localhost:8080/api/real-estate/seller/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching real estate data:", error);
        throw error;
    }
}

