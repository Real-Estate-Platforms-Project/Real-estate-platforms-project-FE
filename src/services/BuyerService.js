import axios from 'axios';
import apiClient from "../configs/AxiosConfigs";

const API_URL = 'http://localhost:8080/api/admin/buyers';

export const getAllBuyers = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching buyers:', error);
        throw error;
    }
};

export const getBuyerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching buyer with ID ${id}:`, error);
        throw error;
    }
};

export const searchBuyers = (searchCriteria) => {
    const params = new URLSearchParams();
    if (searchCriteria.code) params.append('code', searchCriteria.code);
    if (searchCriteria.name) params.append('name', searchCriteria.name);
    if (searchCriteria.email) params.append('email', searchCriteria.email);
    if (searchCriteria.phoneNumber) params.append('phoneNumber', searchCriteria.phoneNumber);

    return axios.get(`${API_URL}/search`, {params})
        .then(response => response.data)
        .catch(error => {
            console.error('Error searching buyers:', error);
            throw error;
        });
};

export const saveUserProfile = async (userData) => {
    await apiClient.post(`/customers/update`, userData);
};