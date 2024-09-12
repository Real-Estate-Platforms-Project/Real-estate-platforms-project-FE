import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/buyers';

export const getAllBuyers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching buyers:', error);
        throw error;
    }
};

export const getBuyerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching buyer with ID ${id}:`, error);
        throw error;
    }
};

export const searchBuyers = async (searchCriteria) => {
    try {
        const params = new URLSearchParams(searchCriteria).toString();
        const response = await axios.get(`${API_URL}?${params}`);
        return response.data;
    } catch (error) {
        console.error('Error searching buyers:', error);
        throw error;
    }
};