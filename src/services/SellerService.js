import apiClient from "../configs/AxiosConfigs";

const API_URL = '/admin/sellers';

export const getAllSellers = async () => {
    try {
        const response = await apiClient.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching sellers:', error);
        throw error;
    }
};

export const getSellerById = async (id) => {
    try {
        const response = await apiClient.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seller with ID ${id}:`, error);
        throw error;
    }
};

export const searchSellers = (searchCriteria) => {
    const params = new URLSearchParams();
    if (searchCriteria.code) params.append('code', searchCriteria.code);
    if (searchCriteria.name) params.append('name', searchCriteria.name);
    if (searchCriteria.email) params.append('email', searchCriteria.email);
    if (searchCriteria.phoneNumber) params.append('phoneNumber', searchCriteria.phoneNumber);

    return apiClient.get(`${API_URL}/search`, { params })
        .then(response => response.data)
        .catch(error => {
            console.error('Error searching sellers:', error);
            throw error;
        });
};
