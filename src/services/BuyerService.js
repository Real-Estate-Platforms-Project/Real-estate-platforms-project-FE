import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/buyers'; // URL của API BE

export const getAllBuyers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching buyers:', error);
        throw error; // Ném lỗi để có thể xử lý ở tầng gọi hàm
    }
};

// Hàm lấy thông tin người mua theo ID
export const getBuyerById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching buyer with ID ${id}:`, error);
        throw error; // Ném lỗi để có thể xử lý ở tầng gọi hàm
    }
};

// Hàm thêm người mua mới
export const addBuyer = async (buyer) => {
    try {
        const response = await axios.post(API_URL, buyer);
        return response.data;
    } catch (error) {
        console.error('Error adding buyer:', error);
        throw error; // Ném lỗi để có thể xử lý ở tầng gọi hàm
    }
};

// Hàm cập nhật người mua theo ID
export const updateBuyer = async (id, buyer) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, buyer);
        return response.data;
    } catch (error) {
        console.error(`Error updating buyer with ID ${id}:`, error);
        throw error; // Ném lỗi để có thể xử lý ở tầng gọi hàm
    }
};

// Hàm xóa người mua theo ID
export const deleteBuyer = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting buyer with ID ${id}:`, error);
        throw error; // Ném lỗi để có thể xử lý ở tầng gọi hàm
    }
};

// Hàm tìm kiếm người mua dựa trên tiêu chí
export const searchBuyers = async (searchCriteria) => {
    try {
        const params = new URLSearchParams(searchCriteria).toString();
        const response = await axios.get(`${API_URL}?${params}`);
        return response.data;
    } catch (error) {
        console.error('Error searching buyers:', error);
        throw error; // Ném lỗi để có thể xử lý ở tầng gọi hàm
    }
};